"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { GameHubCard } from "@/components/home/GameHubCard";
import type { GameHubSummary } from "@/lib/guides";

export function AllGuidesList({ hubs }: { hubs: GameHubSummary[] }) {
  const searchParams = useSearchParams();
  const rawQuery = searchParams.get("q") ?? "";
  const query = rawQuery.toLowerCase().trim();

  const filtered = hubs.filter(
    (hub) =>
      !query ||
      hub.name.toLowerCase().includes(query) ||
      hub.hubDescription.toLowerCase().includes(query) ||
      hub.genre.toLowerCase().includes(query)
  );

  return (
    <>
      <p className="mt-4 max-w-2xl text-stone-600 dark:text-stone-400">
        {query
          ? `${filtered.length} hub${filtered.length === 1 ? "" : "s"} matching "${rawQuery}"`
          : `${hubs.length} games in the library.`}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-12 text-center text-stone-500">
          No game hubs match your search.{" "}
          <Link
            href="/all-guides"
            className="text-brand-700 hover:text-brand-900 dark:text-brand-300 dark:hover:text-white"
          >
            Clear search
          </Link>
        </p>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((hub) => (
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
      )}
    </>
  );
}
