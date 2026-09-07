import { getAllLeafSlugs, getGameHubSummaries, parseGuideFileForSitemap } from "./guides";
import { siteUrl } from "./site";

export type SitemapEntry = {
  url: string;
  lastModified: Date;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
};

const STATIC_PAGES: {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
}[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/all-guides", priority: 0.9, changeFrequency: "weekly" },
  { path: "/about-us", priority: 0.5, changeFrequency: "monthly" },
  { path: "/disclaimers", priority: 0.3, changeFrequency: "yearly" },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms-of-use", priority: 0.3, changeFrequency: "yearly" },
];

export function getSitemapEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [];
  const now = new Date();

  for (const page of STATIC_PAGES) {
    entries.push({
      url: `${siteUrl}${page.path}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    });
  }

  const hubs = getGameHubSummaries();

  for (const hub of hubs) {
    entries.push({
      url: `${siteUrl}/${hub.slug}`,
      lastModified: new Date(hub.latestDate),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  for (const { game, slug } of getAllLeafSlugs()) {
    const meta = parseGuideFileForSitemap(game, slug);
    entries.push({
      url: `${siteUrl}/${game}/${slug}`,
      lastModified: meta?.lastModified ?? now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return entries;
}
