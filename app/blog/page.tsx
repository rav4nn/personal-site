import {
  extractUniqueBlogCategories,
  fetchAndSortBlogPosts,
} from "app/lib/utils";
import { FollowCta } from "@/app/components/FollowCta";
import { BlogPostList } from "@/app/components/BlogPostList";
import { CategorySelect } from "@/app/components/CategorySelect";
import {
  FeaturedBlogCard,
  featuredGridClassName,
} from "@/app/components/FeaturedBlogCard";
import { GridWrapper } from "@/app/components/GridWrapper";
import clsx from "clsx";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Hardeep Singh",
  description: "Articles on software engineering, AI, and building products.",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const allPublishedBlogPosts = fetchAndSortBlogPosts();
  const categories = Array.from(
    extractUniqueBlogCategories(allPublishedBlogPosts),
  );
  const category = (await searchParams).category?.toLowerCase() || "";

  const displayedPosts = category
    ? allPublishedBlogPosts.filter((post) =>
        post.categories?.map((cat) => cat.toLowerCase()).includes(category),
      )
    : allPublishedBlogPosts;

  const featuredPosts = !category && (
    <GridWrapper>
      <ul
        className={clsx(
          "z-50",
          featuredGridClassName(allPublishedBlogPosts.length),
        )}
      >
        {allPublishedBlogPosts.length > 0 ? (
          <>
            {allPublishedBlogPosts.slice(0, 4).map((post, index) => (
              <FeaturedBlogCard
                key={post.slug}
                slug={post.slug}
                imageName={post.imageName}
                title={post.title}
                summary={post.summary}
                className={clsx(
                  // Hide the fourth article on mobile and desktop
                  index === 3 && "hidden md:block lg:hidden",
                )}
              />
            ))}
          </>
        ) : (
          <p>Nothing to see here yet...</p>
        )}
      </ul>
    </GridWrapper>
  );

  return (
    <div className="mt-14 space-y-16 md:mt-16">
      <title>Blog | Hardeep Singh</title>
      <GridWrapper>
        <h1 className="mx-auto max-w-2xl text-balance text-center text-4xl font-medium leading-tight tracking-tighter text-text-primary md:text-6xl md:leading-[64px]">
          {category
            ? `Articles about ${category}`
            : "Notes from building agents && the tools they use."}
        </h1>
      </GridWrapper>

      {featuredPosts}
      <div>
        <CategorySelect categories={categories} currentCategory={category} />
        <BlogPostList posts={displayedPosts} />
      </div>

      <FollowCta />
    </div>
  );
}
