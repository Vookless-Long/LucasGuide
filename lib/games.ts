import type { AccentColor } from "./site";
import { supermarketChaosImages } from "./media";

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
};

export function getGame(slug: string): GameConfig | null {
  return GAMES[slug] ?? null;
}

export function getAllGameSlugs(): string[] {
  return Object.keys(GAMES);
}

export function getFeaturedGames(): GameConfig[] {
  return Object.values(GAMES).filter((g) => g.featured);
}
