import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/portfolio-data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://0xp47.github.io";

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date("2026-07-07"),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    ...blogEntries,
  ];
}
