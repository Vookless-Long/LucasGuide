import Link from "next/link";
import { accentStyles, type AccentColor } from "@/lib/site";

export interface GameHubCardProps {
  slug: string;
  name: string;
  description: string;
  genre: string;
  guideCount: number;
  accent: AccentColor;
  coverGradient: string;
  coverImage?: string;
  size?: "large" | "compact";
}

export function GameHubCard({
  slug,
  name,
  description,
  genre,
  guideCount,
  accent,
  coverGradient,
  coverImage,
  size = "compact",
}: GameHubCardProps) {
  const styles = accentStyles[accent];
  const isLarge = size === "large";

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden border border-stone-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-stone-900/45 dark:hover:bg-stone-900/65 dark:hover:shadow-xl ${styles.hover} ${
        isLarge ? "rounded-2xl lg:col-span-1" : "rounded-xl"
      }`}
    >
      <Link
        href={`/${slug}`}
        aria-label={`Open ${name} guide hub`}
        className={`relative block overflow-hidden ${isLarge ? "aspect-[16/9] sm:aspect-[2/1]" : "aspect-[16/10]"}`}
      >
        <div className={`relative h-full w-full bg-gradient-to-br ${coverGradient}`}>
          {coverImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={coverImage}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-900/50 via-stone-900/5 to-transparent dark:from-stone-950/55 dark:via-stone-950/10" />
          <div className="absolute inset-0 flex items-end p-5 md:p-6">
            <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] ${styles.badge}`}>
              {genre}
            </span>
          </div>
        </div>
      </Link>

      <div className={`relative flex flex-1 flex-col ${isLarge ? "p-5 md:p-6" : "p-5"}`}>
        {isLarge && (
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${styles.glow} to-transparent opacity-55`}
          />
        )}
        <div className="relative flex h-full flex-col">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {!isLarge && (
              <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] ${styles.badge}`}>
                {genre}
              </span>
            )}
            <span className={`text-xs font-bold text-stone-500 ${isLarge ? "ml-auto" : ""}`}>
              {guideCount} guides
            </span>
          </div>

          <h3
            className={`mt-4 line-clamp-2 font-bold leading-tight text-stone-900 transition-colors group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-200 ${
              isLarge ? "text-2xl md:text-3xl" : "text-xl leading-snug"
            }`}
          >
            <Link href={`/${slug}`}>{name}</Link>
          </h3>

          <p
            className={`mt-3 text-sm leading-relaxed text-stone-600 dark:text-stone-400 ${
              isLarge ? "line-clamp-3 lg:line-clamp-2" : "line-clamp-2"
            }`}
          >
            {description}
          </p>

          <div className="mt-auto pt-5">
            <Link
              href={`/${slug}`}
              className={`inline-flex items-center text-sm font-bold ${styles.link}`}
            >
              Open guide hub
              <span aria-hidden className="ml-2 transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
