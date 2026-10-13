import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";

type FeaturedBlogCardProps = {
  slug: string;
  imageName: string;
  title: string;
  summary: string;
  className?: string;
};

export function FeaturedBlogCard({
  slug,
  imageName,
  title,
  summary,
  className,
}: FeaturedBlogCardProps) {
  return (
    <li
      className={clsx(
        "z-50 flex h-full flex-col rounded-3xl border border-border-primary bg-bg-primary p-2",
        className,
      )}
    >
      <Link
        className="flex h-full flex-col rounded-2xl"
        href={`/blog/${slug}`}
        prefetch={true}
      >
        <Image
          src={`/blog/${imageName}`}
          alt={title}
          width={800}
          height={280}
          className="h-[280px] rounded-2xl object-cover md:h-[225px]"
        />
        <div className="my-4 flex w-full flex-grow flex-col space-y-4 text-balance px-4">
          <h2 className="text-lg font-medium leading-7 tracking-tight text-slate-900">
            {title}
          </h2>
          <p className="flex-grow leading-7 text-text-secondary">{summary}</p>
        </div>
      </Link>
    </li>
  );
}

// Grid for a row of featured cards. With fewer than 3 posts the cards stay
// centred instead of leaving empty columns.
export function featuredGridClassName(count: number) {
  if (count >= 3) return "grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3";
  if (count === 2)
    return "mx-auto grid max-w-3xl grid-cols-1 gap-2 md:grid-cols-2";
  return "mx-auto grid max-w-md grid-cols-1 gap-2";
}
