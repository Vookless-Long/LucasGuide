"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { TocEntry } from "@/lib/guides";

export const guideProseClassName =
  "prose prose-stone max-w-none dark:prose-invert prose-headings:scroll-mt-28 prose-a:text-brand-600 dark:prose-a:text-brand-400 prose-img:rounded-xl prose-ul:leading-relaxed";

export function TableOfContents({ items, gameSlug }: { items: TocEntry[]; gameSlug: string }) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return null;

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 rounded-xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-950">
        <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400">
          On this page
        </h2>
        <nav>
          <ul className="space-y-3">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={cn(
                    "relative block text-sm transition-all duration-200",
                    activeId === item.id
                      ? "translate-x-1 font-semibold text-brand-600 dark:text-brand-400"
                      : "text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200"
                  )}
                >
                  {activeId === item.id && (
                    <span className="absolute -left-3 top-1.5 h-1.5 w-1.5 rounded-full bg-brand-600 dark:bg-brand-400" />
                  )}
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-6 border-t border-stone-200 pt-4 dark:border-stone-800">
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">Extra guides</p>
          <Link
            href={`/${gameSlug}`}
            className="mt-2 block text-sm font-medium text-brand-600 hover:underline dark:text-brand-400"
          >
            Back to hub top
          </Link>
        </div>
      </div>
    </aside>
  );
}

export function QuickAnswerSection({
  quickAnswer,
  quickAnswerHtml,
}: {
  quickAnswer: string;
  quickAnswerHtml?: string;
}) {
  return (
    <section className="my-8 rounded-xl border border-brand-200/60 bg-brand-50/50 p-5 shadow-sm dark:border-brand-800/40 dark:bg-brand-950/20">
      <h2 className="mb-3 text-lg font-semibold text-stone-900 dark:text-stone-100">Quick Answer</h2>
      {quickAnswerHtml ? (
        <div
          className={`${guideProseClassName} prose-p:leading-relaxed`}
          dangerouslySetInnerHTML={{ __html: quickAnswerHtml }}
        />
      ) : (
        <div className={`${guideProseClassName} prose-p:leading-relaxed`}>
          <p>{quickAnswer}</p>
        </div>
      )}
    </section>
  );
}

export function StartHereSection({
  gameName,
  quickAnswer,
  quickAnswerHtml,
  children,
}: {
  gameName: string;
  quickAnswer?: string;
  quickAnswerHtml?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="my-8 rounded-xl border border-accent-200/60 bg-accent-50/40 p-5 shadow-sm dark:border-accent-800/30 dark:bg-accent-950/15">
      <h2 className="mb-3 text-lg font-semibold text-stone-900 dark:text-stone-100">Start Here</h2>
      <div className={`${guideProseClassName} prose-p:leading-relaxed`}>
        {quickAnswerHtml ? (
          <div dangerouslySetInnerHTML={{ __html: quickAnswerHtml }} />
        ) : (
          quickAnswer && (
            <p>
              <strong>Quick answer:</strong> {quickAnswer}
            </p>
          )
        )}
        <p>
          If you ask <strong>&quot;where I go next?&quot;</strong>, start with sections below on
          this {gameName} hub page.
        </p>
        {children}
      </div>
    </section>
  );
}
