import type { Metadata } from "next";
import Link from "next/link";
import { GameHubCard } from "@/components/home/GameHubCard";
import { HomeProfile } from "@/components/home/HomeProfile";
import { JsonLdScript, buildWebSiteJsonLd } from "@/lib/schema";
import { getGameHubSummariesSorted } from "@/lib/guides";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: site.tagline,
  description: site.description,
  openGraph: {
    title: `${site.tagline} | ${site.name}`,
    description: site.description,
    type: "website",
  },
};

export default function HomePage() {
  const latest = getGameHubSummariesSorted();

  return (
    <div className="bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-white">
      <JsonLdScript data={buildWebSiteJsonLd(site.name)} />

      <HomeProfile />

      {latest.length > 0 && (
        <section
          id="latest-guides"
          aria-labelledby="latest-guides-title"
          className="scroll-mt-24 border-t border-stone-200 px-4 py-12 md:py-16 dark:border-stone-800"
        >
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700 dark:text-brand-300">
                  {site.home.latestEyebrow}
                </p>
                <h2
                  id="latest-guides-title"
                  className="mt-2 text-2xl font-bold tracking-tight text-stone-900 dark:text-white md:text-3xl"
                >
                  {site.home.latestTitle}
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-stone-600 dark:text-stone-400">
                  {site.home.latestDescription}
                </p>
              </div>
              <Link
                href="/all-guides"
                className="inline-flex shrink-0 items-center text-sm font-bold text-brand-700 hover:underline dark:text-brand-300"
              >
                {site.home.browseAllLink}
              </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {latest.map((hub) => (
                <GameHubCard
                  key={hub.slug}
                  slug={hub.slug}
                  name={hub.name}
                  description={hub.hubDescription}
                  genre={hub.genre}
                  guideCount={hub.guideCount}
                  accent={hub.accent}
                  coverGradient={hub.coverGradient}
                  coverImage={hub.coverImage}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
