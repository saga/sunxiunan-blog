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
    { title: "文章", url: "/posts" },
    { title: "归档", url: "/archive" },
  ],

  footerLinks: [
    { title: "RSS", url: "/rss.xml" },
    { title: "归档", url: "/archive" },
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

  showThemeToggle: false,
  showReadingTime: true,

  heroVariant: "studio",

  annotation: "在代码与文字之间。",
};

export default userConfig;