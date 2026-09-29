import { getBlogPostSlugs } from "./sanity";

export async function getBlogStaticParams() {
  const blogs = await getBlogPostSlugs();

  return blogs
    .filter(
      (blog): blog is { slug: string } =>
        Boolean(blog.slug)
    )
    .map((blog) => ({
      slug: blog.slug,
    }));
}