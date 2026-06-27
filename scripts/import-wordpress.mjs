#!/usr/bin/env node
/**
 * Import all posts (and their images) from a WordPress site into this Astro blog.
 *
 * Usage:
 *   node scripts/import-wordpress.mjs            # import all, skip existing
 *   WP_API=... node scripts/import-wordpress.mjs # override endpoint
 *   FORCE=1 node scripts/import-wordpress.mjs    # overwrite existing posts
 *   LIMIT=5 node scripts/import-wordpress.mjs    # only import first N posts (dry test)
 *
 * Output: src/content/posts/<wp-slug>/{index.md, attachments/}
 *
 * Image handling: WordPress embeds both a `src` (often a resized version on the
 * production domain) and a `srcset` (which usually contains the original, full-
 * size file on the local VM host). For each <img> we parse the srcset, prefer
 * the original (filename without `-WxH` suffix) on the local WP host, download
 * that, and rewrite the tag to point at the local file.
 */

import { mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";

// Bypass any proxy inherited from the shell — the WordPress VM is on the local
// network and must be reached directly. Node's fetch does not read these by
// default, but we clear them defensively so nothing downstream can route
// through a proxy either.
for (const k of [
  "HTTP_PROXY", "HTTPS_PROXY", "ALL_PROXY",
  "http_proxy", "https_proxy", "all_proxy",
  "NO_PROXY", "no_proxy",
]) {
  delete process.env[k];
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const WP_API = (process.env.WP_API || "http://192.168.64.4/wp-json/wp/v2").replace(/\/$/, "");
const WP_BASE = WP_API.replace(/\/wp-json\/wp\/v2\/?$/, "");
// host/protocol of the local WP install — used to prefer local image URLs
const _wpBase = (() => { try { return new URL(WP_BASE); } catch { return null; } })();
const WP_HOST = _wpBase?.host || "";
const WP_PROTO = _wpBase?.protocol || "http:";

const POSTS_DIR = path.join(ROOT, "src/content/posts");
const FORCE = process.env.FORCE === "1";
const LIMIT = process.env.LIMIT ? Number.parseInt(process.env.LIMIT, 10) : 0;

const IMAGE_EXT_RE = /\.(jpe?g|png|gif|webp|avif|svg|bmp|tiff?)(\?|#|$)/i;
// matches a WordPress resized filename suffix, e.g. "image-1280x720.jpg"
const RESIZED_RE = /-\d+x\d+\./;

// ---- turndown setup -------------------------------------------------------
const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
  emDelimiter: "*",
  hr: "---",
});
turndown.use(gfm);

// Preserve <figure><img><figcaption> as image + italic caption.
turndown.addRule("figure", {
  filter: "figure",
  replacement: (_content, node) => {
    const img = node.querySelector("img");
    const cap = node.querySelector("figcaption");
    const src = img?.getAttribute("src") || "";
    const alt = img?.getAttribute("alt") || "";
    const caption = cap?.textContent?.trim() || "";
    let out = `\n\n![${alt}](${src})`;
    if (caption) out += `\n\n*${caption}*`;
    return out + "\n\n";
  },
});

// Drop WordPress block-editor HTML comments.
turndown.addRule("stripComments", {
  filter: (node) => node.nodeType === 8,
  replacement: () => "",
});

// ---- helpers -------------------------------------------------------------
async function fetchJson(url) {
  const res = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(30000) });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText} for ${url}`);
  return res.json();
}

async function fetchAllPosts() {
  const posts = [];
  let page = 1;
  // _embed makes each response large, so use a moderate page size for reliability.
  const perPage = 20;
  while (true) {
    const url = `${WP_API}/posts?_embed=true&per_page=${perPage}&page=${page}&status=publish&orderby=date&order=desc`;
    const data = await fetchJson(url);
    if (!Array.isArray(data)) throw new Error("Unexpected response shape (not an array)");
    posts.push(...data);
    if (data.length < perPage) break;
    page++;
    if (page > 500) break; // safety cap
  }
  return posts;
}

function decodeEntities(s) {
  return (s || "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/<[^>]+>/g, "")
    .trim();
}

function stripHtml(s) {
  return decodeEntities(s);
}

// WordPress stores non-ASCII slugs percent-encoded (e.g. "%e6%8c%91...").
// Decode them so the folder name is the real title. Some WP slugs have a
// truncated percent-encoding at the end (e.g. "...%e2%80%a6%e") which would
// throw URIError. Strip the trailing incomplete %X or bare %, then if
// decoding still fails (truncated multi-byte UTF-8 sequence), keep stripping
// the last complete %XX until it works.
function decodeSlug(s) {
  if (!s) return "";
  let cleaned = s.replace(/%[0-9a-fA-F]?$/, "");
  while (true) {
    try {
      return decodeURIComponent(cleaned) || s;
    } catch {
      const next = cleaned.replace(/%[0-9a-fA-F]{1,2}$/, "");
      if (next === cleaned) return s;
      cleaned = next;
    }
  }
}

function getEmbedded(post) {
  const embedded = post._embedded || {};
  const featured = embedded["wp:featuredmedia"]?.[0];
  const termGroups = embedded["wp:term"] || [];
  const terms = termGroups.flat();
  const categories = terms.filter((t) => t.taxonomy === "category" && t.slug !== "uncategorized");
  const tags = terms.filter((t) => t.taxonomy === "post_tag");
  return { featured, categories, tags };
}

function guessExt(url) {
  const m = url.match(IMAGE_EXT_RE);
  if (!m) return "jpg";
  const e = m[1].toLowerCase();
  return e === "jpeg" ? "jpg" : e;
}

function uniqueName(taken, name) {
  if (!taken.has(name)) {
    taken.add(name);
    return name;
  }
  const ext = path.extname(name);
  const base = path.basename(name, ext);
  let i = 1;
  while (taken.has(`${base}-${i}${ext}`)) i++;
  const next = `${base}-${i}${ext}`;
  taken.add(next);
  return next;
}

function escapeAttr(s) {
  return (s || "").replace(/"/g, "&quot;");
}

function getAttr(tag, name) {
  const re = new RegExp(`\\b${name}=(["'])([^"']*)\\1`, "i");
  const m = tag.match(re);
  return m ? m[2] : "";
}

// For one <img>, gather candidate URLs (from srcset + src), ordered by:
//   1. local WP host (reachable) over remote
//   2. original (no -WxH suffix) over resized
//   3. larger width
function collectCandidates(src, srcsetRaw) {
  const list = [];
  const add = (url, width) => {
    if (!url) return;
    let abs;
    try {
      abs = new URL(url, WP_BASE + "/");
    } catch {
      return;
    }
    const file = path.basename(abs.pathname).split("?")[0];
    if (!IMAGE_EXT_RE.test(file)) return;
    list.push({
      url: abs.href,
      width: width || 0,
      isOriginal: !RESIZED_RE.test(file),
      isLocal: abs.host === WP_HOST,
      file,
    });
  };
  if (srcsetRaw) {
    for (const part of srcsetRaw.split(",")) {
      const t = part.trim();
      if (!t) continue;
      const [u, w] = t.split(/\s+/);
      add(u, w ? Number.parseInt(w, 10) || 0 : 0);
    }
  }
  if (src) add(src, 0);
  list.sort((a, b) => {
    if (a.isLocal !== b.isLocal) return a.isLocal ? -1 : 1;
    if (a.isOriginal !== b.isOriginal) return a.isOriginal ? -1 : 1;
    return b.width - a.width;
  });
  return list;
}

// Download an image. For URLs on the local WP host, fetch directly. For URLs on
// a remote host (e.g. `sunxiunan.com` production domain, or flickr/github), do
// NOT fetch the remote — it may hang on DNS or be unreachable. Instead, rewrite
// the host to the local WP host (the same wp-content/uploads path is served
// from the VM) and fetch that. External-only images (flickr etc.) will 404
// fast on the local host and be skipped.
async function downloadImage(url, destPath) {
  const candidates = [];
  try {
    const u = new URL(url);
    if (u.host === WP_HOST) {
      candidates.push(url);
    } else {
      const local = new URL(url);
      local.host = WP_HOST;
      local.protocol = WP_PROTO;
      local.port = "";
      candidates.push(local.href);
    }
  } catch {
    candidates.push(url);
  }
  for (const c of candidates) {
    try {
      const res = await fetch(c, { redirect: "follow", signal: AbortSignal.timeout(15000) });
      if (!res.ok) continue;
      const ct = res.headers.get("content-type") || "";
      const buf = Buffer.from(await res.arrayBuffer());
      if (!buf.length) continue;
      await mkdir(path.dirname(destPath), { recursive: true });
      await writeFile(destPath, buf);
      return { ok: true, via: c, contentType: ct };
    } catch {
      /* try next */
    }
  }
  console.warn(`  ! image download failed: ${url}`);
  return { ok: false };
}

function frontmatterString(obj) {
  let out = "";
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue;
    if (Array.isArray(v)) {
      if (!v.length) continue;
      out += `${k}:\n`;
      for (const item of v) out += `  - ${yamlScalar(item)}\n`;
    } else if (typeof v === "boolean" || typeof v === "number") {
      out += `${k}: ${v}\n`;
    } else {
      out += `${k}: ${yamlScalar(v)}\n`;
    }
  }
  return out;
}

function yamlScalar(s) {
  const str = String(s);
  if (str === "" || /[:#\[\]{},&*?|>!%@`"'\n\r]/.test(str) || /^\s|\s$/.test(str)) {
    return JSON.stringify(str);
  }
  return str;
}

function slugify(s) {
  return (
    s
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "post"
  );
}

async function pathExists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

// Walk every <img> in the html, pick the best original candidate, download it,
// and rewrite the tag to a clean local <img src="./attachments/..." />.
// Returns the rewritten html and a count { ok, total }.
async function processImages(html, attachDir, taken) {
  let imgTotal = 0;
  let imgOk = 0;
  const downloaded = new Map(); // url -> rel path
  let out = "";
  let last = 0;
  const imgRe = /<img\b[^>]*>/gi;
  let m;
  while ((m = imgRe.exec(html))) {
    out += html.slice(last, m.index);
    const tag = m[0];
    const src = getAttr(tag, "src");
    const srcset = getAttr(tag, "srcset") || "";
    const alt = getAttr(tag, "alt") || "";
    const candidates = collectCandidates(src, srcset);
    if (candidates.length) imgTotal++;

    let rel = null;
    for (const c of candidates) {
      if (downloaded.has(c.url)) {
        rel = downloaded.get(c.url);
        break;
      }
      const fname = uniqueName(taken, c.file || `image-${imgTotal}.${guessExt(c.url)}`);
      const dest = path.join(attachDir, fname);
      const r = await downloadImage(c.url, dest);
      if (r.ok) {
        rel = `./attachments/${fname}`;
        downloaded.set(c.url, rel);
        break;
      }
    }
    if (rel) {
      out += `<img src="${rel}" alt="${escapeAttr(alt)}" />`;
      imgOk++;
    } else {
      out += tag; // leave the original (remote) tag untouched
    }
    last = m.index + tag.length;
  }
  out += html.slice(last);
  return { html: out, ok: imgOk, total: imgTotal };
}

// ---- per-post processing -------------------------------------------------
async function processPost(post) {
  const rawTitle = stripHtml(post.title?.rendered || "Untitled");
  const decoded = decodeSlug(post.slug);
  // If the decoded slug contains no letter/number chars (e.g. pure punctuation
  // like "￥·—￥·"), Astro's github-slugger would turn it into an empty string
  // and break the build. Fall back to slugified title or post-<id>.
  const slug = (decoded && /\p{L}|\p{N}/u.test(decoded)) ? decoded
             : slugify(rawTitle)
             || `post-${post.id}`;
  const postDir = path.join(POSTS_DIR, slug);
  const indexFile = path.join(postDir, "index.md");
  const attachDir = path.join(postDir, "attachments");

  if (!FORCE && (await pathExists(indexFile))) {
    console.log(`• skip ${slug} (exists)`);
    return { slug, skipped: true };
  }

  const { featured, categories, tags } = getEmbedded(post);
  const title = rawTitle;
  const excerpt = stripHtml(post.excerpt?.rendered || "");
  const published = (post.date_gmt || post.date || new Date().toISOString()).slice(0, 10);
  const updatedRaw = post.modified_gmt || post.modified;
  const updated = updatedRaw ? updatedRaw.slice(0, 10) : undefined;
  const category = categories[0]?.name || "Travels";
  const tagNames = tags.map((t) => t.name);

  let html = post.content?.rendered || "";

  // --- inline images: pick originals, download, rewrite tags ---
  const taken = new Set();
  if (/<img\b/i.test(html)) await mkdir(attachDir, { recursive: true });
  const imgResult = await processImages(html, attachDir, taken);
  html = imgResult.html;

  // --- cover / featured image (original via _embed source_url) ---
  let cover = "";
  if (featured?.source_url) {
    const ext = guessExt(featured.source_url);
    const coverName = `cover.${ext === "jpeg" ? "jpg" : ext}`;
    const coverDest = path.join(attachDir, coverName);
    const r = await downloadImage(featured.source_url, coverDest);
    if (r.ok) cover = `posts/${slug}/attachments/${coverName}`;
  }

  // --- html -> markdown ---
  let md = turndown.turndown(html);
  md = md
    .replace(/\r\n/g, "\n")
    // strip TinyMCE editor emotion GIFs (non-existent relative paths)
    .replace(/!\[\]\(\.\.\/editor\/plugins\/emotions\/images\/\d+\.gif\)/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/^\s+|\s+$/g, "");

  // fallback description: first paragraph of body
  let description = excerpt;
  if (!description) {
    const firstPara = md.split(/\n\n/)[0]?.replace(/[#>*`!\[\]()]/g, "").trim() || "";
    description = firstPara.slice(0, 180);
  }

  const fm = {
    title,
    description: description || "...",
    published,
    category,
  };
  if (updated && updated !== published) fm.updated = updated;
  if (tagNames.length) fm.tags = tagNames;
  if (cover) fm.cover = cover;
  if (post.status && post.status !== "publish") fm.draft = true;

  const content = `---\n${frontmatterString(fm)}---\n\n${md}\n`;
  await mkdir(postDir, { recursive: true });
  await writeFile(indexFile, content, "utf8");
  console.log(
    `✓ ${slug}  [img ${imgResult.ok}/${imgResult.total}${cover ? ", cover" : ""}]`,
  );
  return { slug, skipped: false };
}

// ---- main ----------------------------------------------------------------
async function main() {
  console.log(`WordPress API : ${WP_API}`);
  console.log(`WP base host  : ${WP_HOST || "(unknown)"}`);
  console.log(`Output dir    : ${path.relative(ROOT, POSTS_DIR)}`);
  console.log(`Force overwrite: ${FORCE}`);

  console.log("\nFetching posts...");
  let posts;
  try {
    posts = await fetchAllPosts();
  } catch (e) {
    console.error(`\nFailed to reach WordPress: ${e.message}`);
    console.error(`Check that WP_API is reachable: ${WP_API}/posts?per_page=1`);
    process.exit(1);
  }
  console.log(`Found ${posts.length} published posts.`);

  if (LIMIT > 0) {
    posts = posts.slice(0, LIMIT);
    console.log(`LIMIT=${LIMIT} -> importing ${posts.length}.`);
  }

  await mkdir(POSTS_DIR, { recursive: true });
  const results = [];
  for (const post of posts) {
    try {
      results.push(await processPost(post));
    } catch (e) {
      console.error(`✗ post id=${post.id} slug=${post.slug}: ${e.message}`);
      results.push({ slug: post.slug, error: e.message });
    }
  }

  const ok = results.filter((r) => !r.skipped && !r.error).length;
  const skipped = results.filter((r) => r.skipped).length;
  const failed = results.filter((r) => r.error).length;
  console.log(`\nDone. imported=${ok} skipped=${skipped} failed=${failed}`);
  if (failed) process.exitCode = 1;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
