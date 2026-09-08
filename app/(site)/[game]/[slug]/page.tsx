import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  guideProseClassName,
  QuickAnswerSection,
  TableOfContents,
} from "@/components/game/GameHubArticle";
import { Breadcrumbs, IfThenRouter } from "@/components/ui/GuideComponents";
import { JsonLdScript, buildBreadcrumbJsonLd, guideToArticleSchema } from "@/lib/schema";
import { formatLeafGuideTitle } from "@/lib/guide-titles";
import { getGame, isGamePublished } from "@/lib/games";
import { getLeafGuide, getAllLeafSlugs } from "@/lib/guides";
import { site } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ game: string; slug: string }>;
}): Promise<Metadata> {
  const { game, slug } = await params;
  const guide = await getLeafGuide(game, slug);
  const gameConfig = getGame(game);
  if (!guide || !isGamePublished(game)) return { title: "Guide Not Found" };
  const pageTitle = gameConfig
    ? formatLeafGuideTitle(gameConfig.name, guide.title)
    : guide.title;
  return {
    title: pageTitle,
    description: guide.description,
    openGraph: {
      title: pageTitle,
      description: guide.description,
      type: "article",
      publishedTime: guide.date,
    },
  };
}

export default async function LeafGuidePage({
  params,
}: {
  params: Promise<{ game: string; slug: string }>;
}) {
  const { game: gameSlug, slug } = await params;
  const game = getGame(gameSlug);
  const guide = await getLeafGuide(gameSlug, slug);

  if (!guide || !game || !isGamePublished(gameSlug)) notFound();

  const pageTitle = formatLeafGuideTitle(game.name, guide.title);
  const canonicalUrl = `${site.url}/${gameSlug}/${slug}`;

  return (
    <>
      <JsonLdScript
        data={[
          guideToArticleSchema(guide, canonicalUrl, pageTitle),
          buildBreadcrumbJsonLd([
            { name: site.name, url: site.url },
            { name: game.name, url: `${site.url}/${gameSlug}` },
            { name: guide.title, url: canonicalUrl },
          ]),
        ]}
      />

      <main className="mx-auto max-w-6xl px-4 py-10">
        <Breadcrumbs
          items={[
            { label: site.name, href: "/" },
            { label: game.name, href: `/${gameSlug}` },
            { label: guide.title },
          ]}
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          <article className="min-w-0">
            <header className="mb-8">
              <p className="mb-2 text-sm font-medium uppercase tracking-wide text-brand-600 dark:text-brand-400">
                {game.name} Guide
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100 md:text-5xl">
                {pageTitle}
              </h1>
              {guide.description && (
                <p className="mt-4 max-w-3xl text-lg leading-8 text-stone-600 dark:text-stone-400">
                  {guide.description}
                </p>
              )}
              <p className="mt-3 text-sm italic text-stone-500">
                Last updated: {formatDate(guide.updated ?? guide.date)}
              </p>
            </header>

            {guide.quickAnswer && (
              <QuickAnswerSection
                quickAnswer={guide.quickAnswer}
                quickAnswerHtml={guide.quickAnswerHtml}
              />
            )}

            <div
              className={guideProseClassName}
              dangerouslySetInnerHTML={{ __html: guide.html }}
            />

            {guide.ifThenLinks && guide.ifThenLinks.length > 0 && (
              <IfThenRouter
                links={guide.ifThenLinks}
                game={gameSlug}
                title="Where to go next"
              />
            )}

            <div className="mt-12 rounded-xl border border-stone-200 bg-stone-50 p-6 dark:border-stone-800 dark:bg-stone-900/50">
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                More {game.name} guides
              </h2>
              <p className="mt-2 text-stone-600 dark:text-stone-400">
                Go back to hub for full walkthrough, or browse all games.
              </p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                <Link
                  href={`/${gameSlug}`}
                  className="inline-flex items-center text-sm font-bold text-brand-600 hover:underline dark:text-brand-400"
                >
                  ← Back to {game.name} hub
                </Link>
                <Link
                  href="/all-guides"
                  className="inline-flex items-center text-sm font-bold text-brand-600 hover:underline dark:text-brand-400"
                >
                  Browse all game guides →
                </Link>
              </div>
            </div>
          </article>

          <TableOfContents items={guide.toc} gameSlug={gameSlug} />
        </div>
      </main>
    </>
  );
}

export function generateStaticParams() {
  return getAllLeafSlugs().map(({ game, slug }) => ({ game, slug }));
}
