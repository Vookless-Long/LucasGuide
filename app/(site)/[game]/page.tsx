import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/GuideComponents";
import {
  guideProseClassName,
  StartHereSection,
  TableOfContents,
} from "@/components/game/GameHubArticle";
import { JsonLdScript, buildBreadcrumbJsonLd, buildWebSiteJsonLd } from "@/lib/schema";
import { getGame } from "@/lib/games";
import { getHubGuide, getGamesFromGuides } from "@/lib/guides";
import { site } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ game: string }>;
}): Promise<Metadata> {
  const { game: gameSlug } = await params;
  const game = getGame(gameSlug);
  const hub = await getHubGuide(gameSlug);
  if (!game || !hub) return { title: "Not Found" };

  return {
    title: hub.title,
    description: hub.description,
    openGraph: {
      title: hub.title,
      description: hub.description,
      ...(hub.image && { images: [{ url: hub.image }] }),
    },
  };
}

export default async function GameHubPage({
  params,
}: {
  params: Promise<{ game: string }>;
}) {
  const { game: gameSlug } = await params;
  const game = getGame(gameSlug);
  const hub = await getHubGuide(gameSlug);

  if (!game || !hub) notFound();

  return (
    <>
      <JsonLdScript
        data={[
          buildWebSiteJsonLd(game.name),
          buildBreadcrumbJsonLd([
            { name: site.name, url: site.url },
            { name: game.name, url: `${site.url}/${gameSlug}` },
          ]),
        ]}
      />

      <main className="mx-auto max-w-6xl px-4 py-10">
        <Breadcrumbs
          items={[
            { label: site.name, href: "/" },
            { label: game.name, href: `/${gameSlug}` },
            { label: hub.title },
          ]}
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          <article className="min-w-0">
            <header className="mb-8">
              <p className="mb-2 text-sm font-medium uppercase tracking-wide text-brand-600 dark:text-brand-400">
                {game.name} Guide
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100 md:text-5xl">
                {hub.title}
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-stone-600 dark:text-stone-400">
                {hub.description}
              </p>
              <p className="mt-3 text-sm italic text-stone-500">
                Last updated: {formatDate(hub.updated ?? hub.date)}
              </p>
            </header>

            {hub.quickAnswer && (
              <StartHereSection gameName={game.name} quickAnswer={hub.quickAnswer} />
            )}

            <div
              className={guideProseClassName}
              dangerouslySetInnerHTML={{ __html: hub.html }}
            />

            <div className="mt-12 rounded-xl border border-stone-200 bg-stone-50 p-6 dark:border-stone-800 dark:bg-stone-900/50">
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                Done with {game.name}? Pick next game.
              </h2>
              <p className="mt-2 text-stone-600 dark:text-stone-400">
                Browse all guides or go back to homepage.
              </p>
              <Link
                href="/all-guides"
                className="mt-4 inline-flex items-center text-sm font-bold text-brand-600 hover:underline dark:text-brand-400"
              >
                Browse all game guides →
              </Link>
            </div>
          </article>

          <TableOfContents items={hub.toc} gameSlug={gameSlug} />
        </div>
      </main>
    </>
  );
}

export function generateStaticParams() {
  return getGamesFromGuides().map((game) => ({ game }));
}
