import type { MetadataRoute } from "next";
import { fetchAndSortBlogPosts } from "@/app/lib/utils";
import { siteMetadata } from "@/app/data/siteMetadata";
import { getStudyLessons } from "@/app/lib/study";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = fetchAndSortBlogPosts();
  const blogUrls = posts.map((post) => ({
    url: `${siteMetadata.siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
  const studyUrls = getStudyLessons().map((lesson) => ({
    url: `${siteMetadata.siteUrl}/study/${lesson.slug}`,
    lastModified: new Date(lesson.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: `${siteMetadata.siteUrl}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${siteMetadata.siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteMetadata.siteUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteMetadata.siteUrl}/toolbox`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteMetadata.siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    ...blogUrls,
    {
      url: `${siteMetadata.siteUrl}/study`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    ...studyUrls,
  ];
}
