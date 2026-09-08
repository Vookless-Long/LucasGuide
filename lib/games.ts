import type { AccentColor } from "./site";
import { supermarketChaosImages, titanicEscapeSimulatorImages } from "./media";

export interface GameConfig {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  hubDescription: string;
  genre: string;
  genres: string[];
  releaseYear: number;
  accent: AccentColor;
  featured?: boolean;
  /** When false, hub + leaf pages are not built or listed (content stays in repo). */
  published?: boolean;
  coverGradient: string;
  coverImage?: string;
}

export const GAMES: Record<string, GameConfig> = {
  "supermarket-chaos": {
    slug: "supermarket-chaos",
    name: "Supermarket Chaos",
    tagline: "Three-Mode route — Supermarket, Dreamlike store, Mega Market.",
    description:
      "Supermarket Chaos guides: Mode 1 supermarket clear, Mode 2 Dreamlike shelf placement (leaf pages), Mode 3 Mega Market grind.",
    hubDescription:
      "Luca's three-Mode route — Supermarket, Dreamlike store, Mega Market. Leaf pages for Dreamlike shelf counts.",
    genre: "Puzzle Simulation",
    genres: ["Puzzle", "Simulation", "Indie"],
    releaseYear: 2025,
    accent: "sky",
    featured: true,
    coverGradient: "from-sky-500 via-cyan-900 to-stone-950",
    coverImage: supermarketChaosImages.feature,
  },
  "hidden-portals-eternal-balance": {
    slug: "hidden-portals-eternal-balance",
    name: "Hidden Portals: Eternal Balance",
    tagline: "Linear hub route — library to Luminaria, temple, and ruins ending.",
    description:
      "Hidden Portals: Eternal Balance walkthrough — prologue clock portal, Luminaria puzzles, Temple of Guardians, and ending branches.",
    hubDescription:
      "Luca's full linear route with leaf pages for the puzzles that actually block progress.",
    genre: "Adventure / Hidden Object",
    genres: ["Adventure", "Puzzle", "Hidden Object", "Point-and-click"],
    releaseYear: 2025,
    accent: "violet",
    featured: false,
    published: false,
    coverGradient: "from-violet-600 via-indigo-950 to-stone-950",
  },
  "titanic-escape-simulator": {
    slug: "titanic-escape-simulator",
    name: "Titanic Escape Simulator",
    tagline: "Full chapter route — safe codes, Turkish baths, Graves, three endings.",
    description:
      "Titanic Escape Simulator walkthrough — prologue safe 033109, Turkish bath steam puzzle, Graves in Boiler Room Six, sinking escape, and all Boat Deck endings.",
    hubDescription:
      "Luca's linear chapter route with leaf pages for the steam room, Graves fight, endings, and achievements.",
    genre: "Adventure / Escape",
    genres: ["Adventure", "Puzzle", "Escape room", "Horror"],
    releaseYear: 2025,
    accent: "amber",
    featured: true,
    published: true,
    coverGradient: "from-amber-600 via-stone-800 to-stone-950",
    coverImage: titanicEscapeSimulatorImages.feature,
  },
};

export function getGame(slug: string): GameConfig | null {
  return GAMES[slug] ?? null;
}

export function isGamePublished(slug: string): boolean {
  const game = GAMES[slug];
  return !!game && game.published !== false;
}

export function getAllGameSlugs(): string[] {
  return Object.keys(GAMES);
}

export function getPublishedGameSlugs(): string[] {
  return getAllGameSlugs().filter(isGamePublished);
}

export function getFeaturedGames(): GameConfig[] {
  return Object.values(GAMES).filter((g) => g.featured);
}
