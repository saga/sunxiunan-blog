// src/pages/og.png.ts

import type {
  APIRoute,
} from "astro";

import {
  generateOgImage,
} from "@/utils/og";

export const GET: APIRoute =
  async (context) => {
    const png =
      await generateOgImage(
        {
          title: "孙秀楠的网站",

          description:
            "个人博客",

          category:
            "Astro Theme",

          site: "https://sunxiunan.com",
        }
      );

    return new Response(png, {
      headers: {
        "Content-Type":
          "image/png",
      },
    });
  };