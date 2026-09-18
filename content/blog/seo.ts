import type { BlogPost } from "./types";
import { getArticleImageUrl } from "./images";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://goldenpalmeraglobal.com"
).replace(/\/$/, "");

export function buildBlogArticleJsonLd(
  article: BlogPost,
) {
  const image = getArticleImageUrl(article.coverImage);

  const articleUrl = `${SITE_URL}/blog/${encodeURIComponent(
    article.slug,
  )}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",

    headline: article.title,

    ...(article.excerpt
      ? {
          description: article.excerpt,
        }
      : {}),

    ...(image
      ? {
          image: [image],
        }
      : {}),

    ...(article.publishedAt
      ? {
          datePublished: article.publishedAt,
          dateModified: article.publishedAt,
        }
      : {}),

    author: {
      "@type": "Person",
      name:
        article.author?.name ||
        "Golden Palmera Global",
    },

    publisher: {
      "@type": "Organization",
      name: "Golden Palmera Global",
      url: SITE_URL,
    },

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
  };
}