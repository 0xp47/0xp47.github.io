import type { Metadata } from "next";
import { BlogPageClient } from "./blog-page-client";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts, lessons, and things I've learned along the way by Jay Patrick Cano (0xp47).",
  alternates: {
    canonical: "/blog",
  },
};

export default function Page() {
  return <BlogPageClient />;
}
