import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import { getGame } from "./games";
import { slugify } from "./utils";

const GUIDES_DIR = path.join(process.cwd(), "guides");

export interface GuideFrontmatter {
  title: string;
  description: string;
  game: string;
  slug: string;
  type?: "hub" | "guide";
  topic?: string;
  date: string;
  updated?: string;
  image?: string;
  quickAnswer?: string;
  tags?: string[];
  related?: string[];
  ifThenLinks?: {
    condition: string;
    targetSlug: string;
    targetTitle: string;
  }[];
  featured?: boolean;
  draft?: boolean;
}

export interface Guide extends GuideFrontmatter {
  type: "hub" | "guide";
  content: string;
  html: string;
  filePath: string;
}

export interface TocEntry {
  id: string;
  title: string;
}

function ensureGuidesDir(): void {
  if (!fs.existsSync(GUIDES_DIR)) fs.mkdirSync(GUIDES_DIR, { recursive: true });
}

function addHeadingIds(htmlContent: string): string {
  return htmlContent.replace(/<h2>([^<]+)<\/h2>/g, (_, text: string) => {
    const id = slugify(text.replace(/<[^>]+>/g, ""));
    return `<h2 id="${id}">${text}</h2>`;
  });
}

async function markdownToHtml(markdown: string, withHeadingIds = false): Promise<string> {
  const result = await remark().use(gfm).use(html, { sanitize: false }).process(markdown);
  const raw = result.toString();
  return withHeadingIds ? addHeadingIds(raw) : raw;
}

export function extractTocFromHtml(htmlContent: string): TocEntry[] {
  const entries: TocEntry[] = [];
  const regex = /<h2 id="([^"]+)">([^<]+)<\/h2>/g;
  let match;
  while ((match = regex.exec(htmlContent)) !== null) {
    entries.push({ id: match[1], title: match[2] });
  }
  return entries;
}

function parseGuideFile(filePath: string): Guide | null {
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    const fm = data as Partial<GuideFrontmatter>;

    const type = fm.type ?? (fm.slug === "hub" ? "hub" : "guide");
    const slug =
      fm.slug ??
      (type === "hub" ? "hub" : path.basename(filePath, ".md"));

    if (!fm.title || !fm.game) {
      console.warn(`[guides] Missing required frontmatter in ${filePath}`);
      return null;
    }
    if (fm.draft) return null;

    return {
      title: fm.title,
      description: fm.description ?? "",
      game: fm.game,
      slug,
      type,
      topic: fm.topic,
      date: fm.date ?? new Date().toISOString().split("T")[0],
      updated: fm.updated,
      image: fm.image,
      quickAnswer: fm.quickAnswer,
      tags: fm.tags ?? [],
      related: fm.related ?? [],
      ifThenLinks: fm.ifThenLinks ?? [],
      featured: fm.featured,
      draft: fm.draft,
      content,
      html: "",
      filePath,
    };
  } catch (err) {
    console.warn(`[guides] Failed to parse ${filePath}:`, err);
    return null;
  }
}

/** All .md files: guides/[game]/*.md (flat per game) */
export function getAllGuideFilePaths(): string[] {
  ensureGuidesDir();
  const results: string[] = [];

  if (!fs.existsSync(GUIDES_DIR)) return results;

  for (const gameEntry of fs.readdirSync(GUIDES_DIR, { withFileTypes: true })) {
    if (!gameEntry.isDirectory()) continue;
    const gameDir = path.join(GUIDES_DIR, gameEntry.name);
    for (const file of fs.readdirSync(gameDir)) {
      if (file.endsWith(".md")) results.push(path.join(gameDir, file));
    }
  }

  return results;
}

export function getGamesFromGuides(): string[] {
  if (!fs.existsSync(GUIDES_DIR)) return [];
  return fs
    .readdirSync(GUIDES_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name);
}

export async function getHubGuide(game: string): Promise<(Guide & { toc: TocEntry[] }) | null> {
  const hubPath = path.join(GUIDES_DIR, game, "hub.md");
  if (!fs.existsSync(hubPath)) return null;

  const guide = parseGuideFile(hubPath);
  if (!guide) return null;

  guide.html = await markdownToHtml(guide.content, true);
  const toc = extractTocFromHtml(guide.html);
  return { ...guide, toc };
}

export async function getLeafGuide(
  game: string,
  slug: string
): Promise<(Guide & { toc: TocEntry[] }) | null> {
  if (slug === "hub") return null;

  const filePath = path.join(GUIDES_DIR, game, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    const match = getAllGuideFilePaths().find((f) => {
      const g = parseGuideFile(f);
      return g?.game === game && g.slug === slug && g.type !== "hub";
    });
    if (!match) return null;
    const guide = parseGuideFile(match);
    if (!guide) return null;
    guide.html = await markdownToHtml(guide.content, true);
    return { ...guide, toc: extractTocFromHtml(guide.html) };
  }

  const guide = parseGuideFile(filePath);
  if (!guide || guide.type === "hub") return null;
  guide.html = await markdownToHtml(guide.content, true);
  return { ...guide, toc: extractTocFromHtml(guide.html) };
}

export async function getLeafGuides(game: string): Promise<Guide[]> {
  const files = getAllGuideFilePaths();
  const guides: Guide[] = [];

  for (const filePath of files) {
    const guide = parseGuideFile(filePath);
    if (!guide || guide.game !== game || guide.type === "hub") continue;
    guide.html = await markdownToHtml(guide.content);
    guides.push(guide);
  }

  return guides.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllLeafSlugs(): { game: string; slug: string }[] {
  const slugs: { game: string; slug: string }[] = [];
  for (const filePath of getAllGuideFilePaths()) {
    const guide = parseGuideFile(filePath);
    if (!guide || guide.type === "hub") continue;
    slugs.push({ game: guide.game, slug: guide.slug });
  }
  return slugs;
}

export function parseGuideFileForSitemap(
  game: string,
  slug: string
): { lastModified: Date } | null {
  const filePath = path.join(GUIDES_DIR, game, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const guide = parseGuideFile(filePath);
  if (!guide) return null;

  const dateStr = guide.updated ?? guide.date;
  const parsed = new Date(dateStr);
  return { lastModified: Number.isNaN(parsed.getTime()) ? new Date() : parsed };
}

export interface GameHubSummary {
  slug: string;
  name: string;
  description: string;
  hubDescription: string;
  genre: string;
  accent: import("./site").AccentColor;
  coverGradient: string;
  coverImage?: string;
  guideCount: number;
  latestDate: string;
  featured: boolean;
}

export function getGameHubSummaries(): GameHubSummary[] {
  return getGamesFromGuides()
    .map((slug) => {
      const config = getGame(slug);
      if (!config) return null;

      const leaves = getAllGuideFilePaths()
        .map(parseGuideFile)
        .filter((g): g is Guide => !!g && g.game === slug && g.type !== "hub");

      const latestDate = leaves.reduce(
        (max, g) => (g.date > max ? g.date : max),
        "2024-01-01"
      );

      return {
        slug: config.slug,
        name: config.name,
        description: config.description,
        hubDescription: config.hubDescription,
        genre: config.genre,
        accent: config.accent,
        coverGradient: config.coverGradient,
        coverImage: config.coverImage,
        guideCount: leaves.length,
        latestDate,
        featured: config.featured ?? false,
      };
    })
    .filter(Boolean) as GameHubSummary[];
}

export function getGameHubSummariesSorted(): GameHubSummary[] {
  return getGameHubSummaries().sort(
    (a, b) => new Date(b.latestDate).getTime() - new Date(a.latestDate).getTime()
  );
}

export function getFeaturedHubSummaries(): GameHubSummary[] {
  return getGameHubSummaries().filter((g) => g.featured);
}

export async function getHubQuickAnswer(game: string): Promise<string | null> {
  const hub = await getHubGuide(game);
  return hub?.quickAnswer ?? null;
}

