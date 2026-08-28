import { client } from "@/sanity/lib/client";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://goldenpalmeraglobal.com";

export async function GET() {
  const posts = await client.fetch<
    {
      title: string;
      slug: string;
      excerpt?: string;
      publishedAt: string;
    }[]
  >(
    `
      *[
        _type == "post"
        && defined(slug.current)
        && defined(publishedAt)
        && publishedAt <= now()
      ]
      | order(publishedAt desc)[0...20] {
        title,
        "slug": slug.current,
        excerpt,
        publishedAt
      }
    `,
  );

  const items = posts
    .map(
      (post) => `
        <item>
          <title><![CDATA[${post.title}]]></title>
          <link>${SITE_URL}/blog/${post.slug}</link>
          <guid>${SITE_URL}/blog/${post.slug}</guid>
          <description><![CDATA[${
            post.excerpt || ""
          }]]></description>
          <pubDate>${new Date(
            post.publishedAt,
          ).toUTCString()}</pubDate>
        </item>
      `,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>GPG Insights</title>
    <link>${SITE_URL}/blog</link>
    <description>
      Agriculture, commodities, African supply chains and global trade insights.
    </description>

    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}