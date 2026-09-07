import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import type { Guide } from "@/lib/guides";
import { formatDate } from "@/lib/utils";

export function GuideCard({
  guide,
}: {
  guide: Pick<Guide, "title" | "description" | "game" | "slug" | "date">;
}) {
  const href = `/${guide.game}/${guide.slug}`;

  return (
    <Link href={href} className="card-surface-hover group block p-5">
      <time className="text-xs font-medium text-stone-400">{formatDate(guide.date)}</time>
      <h3 className="mt-2 font-display text-lg font-semibold text-stone-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">
        {guide.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm text-stone-500 dark:text-stone-400">
        {guide.description}
      </p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-600 dark:text-brand-400">
        Read guide <IconArrowRight size={14} />
      </span>
    </Link>
  );
}

export function IfThenRouter({
  links,
  game,
  title,
}: {
  links: { targetSlug: string; targetTitle: string; targetCategory?: string }[];
  game: string;
  title: string;
}) {
  if (!links.length) return null;

  return (
    <section className="mt-12 rounded-xl border border-stone-200 bg-stone-50 p-6 dark:border-stone-800 dark:bg-stone-900/50">
      <h2 className="font-display text-lg font-semibold text-stone-900 dark:text-white">{title}</h2>
      <ul className="mt-4 space-y-3">
        {links.map((link, i) => (
          <li key={i} className="flex items-start gap-2 text-sm leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
            <span className="text-stone-600 dark:text-stone-300">
              If you need more info, check{" "}
              <Link
                href={`/${game}/${link.targetSlug}`}
                className="font-medium text-brand-600 hover:underline dark:text-brand-400"
              >
                {link.targetTitle}
              </Link>
              .
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-stone-500 dark:text-stone-400">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden>/</span>}
            {item.href ? (
              <Link href={item.href} className="hover:text-brand-600 dark:hover:text-brand-400">
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-stone-900 dark:text-white">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
