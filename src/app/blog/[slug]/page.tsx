import { blogPosts } from "@/lib/portfolio-data";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostPage } from "./blog-post-page";

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };

  const baseUrl = "https://jaypatrickcano.dev";
  const postUrl = `${baseUrl}/blog/${slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: postUrl,
      publishedTime: new Date(post.date).toISOString(),
      authors: ["Jay Patrick Cano"],
      tags: post.tags,
      images: [
        {
          url: "/images/me-thumbnail.png",
          width: 300,
          height: 300,
          alt: `${post.title} — Jay Patrick Cano`,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: post.title,
      description: post.description,
      images: [
        {
          url: "/images/me-thumbnail.png",
          width: 300,
          height: 300,
          alt: `${post.title} — Jay Patrick Cano`,
        },
      ],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const baseUrl = "https://jaypatrickcano.dev";
  const postUrl = `${baseUrl}/blog/${slug}`;

  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: {
      "@type": "Person",
      name: "Jay Patrick Cano",
      url: baseUrl,
    },
    publisher: {
      "@type": "Person",
      name: "Jay Patrick Cano",
      url: baseUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    keywords: post.tags.join(", "),
    image: `${baseUrl}/images/me.png`,
    url: postUrl,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${baseUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostingJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <BlogPostPage post={post} />
    </>
  );
}
