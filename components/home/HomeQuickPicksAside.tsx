import Link from "next/link";
import { IconArrowRight, IconBooks, IconSparkles } from "@tabler/icons-react";
import { getFeaturedHubSummaries } from "@/lib/guides";

export function HomeQuickPicksAside() {
  const featured = getFeaturedHubSummaries().slice(0, 2);

  return (
    <aside
      aria-labelledby="home-quick-picks-title"
      className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none"
    >
      <div
        aria-hidden
        className="absolute -inset-5 rounded-3xl bg-gradient-to-br from-brand-300/25 via-accent-200/15 to-transparent blur-3xl dark:from-brand-500/20 dark:via-accent-500/10"
      />
      <div className="relative overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xl dark:border-white/10 dark:bg-stone-900/85 dark:shadow-2xl">
        <div className="border-b border-stone-100 bg-gradient-to-br from-brand-50 to-white p-6 dark:border-white/10 dark:from-white/[0.08] dark:to-transparent md:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-full bg-brand-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-800 dark:bg-brand-400/15 dark:text-brand-100">
              Start Here
            </span>
            <span className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-bold text-stone-600 dark:border-white/10 dark:bg-white/[0.06] dark:text-stone-300">
              Two ways in
            </span>
          </div>
          <h2
            id="home-quick-picks-title"
            className="mt-6 text-3xl font-bold leading-tight tracking-tight text-stone-900 dark:text-white md:text-4xl"
          >
            Pick a game
          </h2>
          <p className="mt-4 text-base leading-relaxed text-stone-600 dark:text-stone-300">
            Browse all hubs, or jump into one game I already finished routing.
          </p>
        </div>

        <div className="space-y-3 p-5 md:p-6">
          <Link
            href="/all-guides"
            className="group block overflow-hidden rounded-xl border border-stone-200 bg-stone-50 transition duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 dark:border-white/10 dark:bg-white/[0.055] dark:hover:border-brand-300/60 dark:hover:bg-brand-400/[0.10] dark:focus-visible:ring-brand-300"
          >
            <div className="grid gap-4 p-4 sm:grid-cols-[100px_minmax(0,1fr)] sm:items-center">
              <div className="flex aspect-square items-center justify-center rounded-xl border border-brand-200 bg-gradient-to-br from-brand-500 to-brand-700 shadow-sm dark:border-white/10 dark:from-brand-600 dark:to-brand-900">
                <IconBooks size={32} className="text-white dark:text-brand-200" stroke={1.5} />
              </div>
              <div className="min-w-0 py-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-700 dark:text-brand-200">
                  Full library
                </p>
                <h3 className="mt-1.5 text-lg font-bold leading-tight text-stone-900 dark:text-white">
                  All game hubs
                </h3>
                <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-300">
                  Every game on LucasGuide — with guide counts.
                </p>
                <span className="mt-3 inline-flex items-center text-sm font-bold text-brand-700 dark:text-brand-200">
                  View all hubs
                  <IconArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>

          {featured[0] && (
            <Link
              href={`/${featured[0].slug}`}
              className="group block rounded-xl border border-stone-200 bg-stone-50 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-accent-300 hover:bg-accent-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 dark:border-white/10 dark:bg-white/[0.055] dark:hover:border-accent-300/60 dark:hover:bg-accent-400/[0.10] dark:focus-visible:ring-brand-300"
            >
              <div className="flex gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-100 text-accent-700 dark:bg-accent-400/15 dark:text-accent-200">
                  <IconSparkles size={24} stroke={1.5} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-accent-700 dark:text-accent-200">
                    Featured hub
                  </p>
                  <h3 className="mt-1.5 text-lg font-bold leading-tight text-stone-900 dark:text-white">
                    {featured[0].name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-stone-600 dark:text-stone-300">
                    {featured[0].hubDescription}
                  </p>
                  <span className="mt-3 inline-flex items-center text-sm font-bold text-accent-700 dark:text-accent-200">
                    Open guide hub
                    <IconArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          )}

          {featured[0] && (
            <div className="flex flex-wrap gap-2 border-t border-stone-100 pt-4 dark:border-white/10">
              <Link
                href={`/${featured[0].slug}`}
                className="rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-semibold text-stone-600 transition hover:border-brand-300 hover:text-brand-800 dark:border-white/10 dark:bg-white/[0.06] dark:text-stone-300 dark:hover:border-brand-300/40 dark:hover:text-white"
              >
                Open {featured[0].name} hub
              </Link>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
