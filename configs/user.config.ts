import type { UserConfig } from "../src/site.config";

const userConfig: UserConfig = {
  title: "孙秀楠的网站",
  description:
    "个人博客",

  url: "https://sunxiunan.com",
  author: "Sunxiunan",

  logo: "/logo.svg",
  avatar: "/avatar.png",

  navigation: [
    { title: "Writing", url: "/posts" },
    { title: "Archive", url: "/archive" },
    { title: "About", url: "/about" },
  ],

  footerLinks: [
    { title: "RSS", url: "/rss.xml" },
    { title: "Archive", url: "/archive" },
    { title: "Source", url: "https://github.com/saga" },
    
  ],

  social: [
    {
      title: "GitHub",
      url: "https://github.com/saga",
      icon: "github",
    }
    
  ],

  footerCredits: "Designed for reading. Built with Astro",

  postsPerPage: 8,
  recentPosts: 6,
  relatedPosts: 4,

  showThemeToggle: true,
  showReadingTime: true,

  heroVariant: "studio",

  annotation: "在代码与文字之间。",
};

export default userConfig;