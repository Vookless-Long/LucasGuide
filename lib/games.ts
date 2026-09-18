import type { AccentColor } from "./site";
import {
  animalyBarNoHumanityImages,
  monsterAlchemyImages,
  supermarketChaosImages,
  titanicEscapeSimulatorImages,
  twentyMoreMazesImages,
  welcomeToElderfieldImages,
} from "./media";

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
  "welcome-to-elderfield": {
    slug: "welcome-to-elderfield",
    name: "Welcome to Elderfield",
    tagline: "Farm horror route — Zartekch seal, rituals, god rooms, moon events.",
    description:
      "Welcome to Elderfield walkthrough — farm the Zartekch shrine seal, Molly's furnace, god shrines, four god rooms, moon events, and boss fights through the first Blood Moon.",
    hubDescription:
      "Luca's linear route from Prologue to Blood Moon with leaf pages for bosses, rituals, blessings, and crafting.",
    genre: "Horror / Farming RPG",
    genres: ["Horror", "Farming", "RPG", "Indie"],
    releaseYear: 2025,
    accent: "emerald",
    featured: true,
    published: true,
    coverGradient: "from-emerald-700 via-stone-800 to-stone-950",
    coverImage: welcomeToElderfieldImages.feature,
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
  "animaly-bar-no-humanity": {
    slug: "animaly-bar-no-humanity",
    name: "Animaly Bar: NO HUMANITY",
    tagline: "Bar sim route — human checks, Festival Day, three endings, three achievements.",
    description:
      "Animaly Bar: NO HUMANITY walkthrough — Day 1 routine, Agent Pingu contract, four suspicion criteria, shotgun and scanner, Festival Day, looter defense, all endings and achievements.",
    hubDescription:
      "Luca's full bar route with leaf pages for tips, all endings, and all achievements.",
    genre: "Horror / Simulation",
    genres: ["Horror", "Simulation", "Indie", "Bar management"],
    releaseYear: 2025,
    accent: "purple",
    featured: true,
    published: true,
    coverGradient: "from-purple-600 via-fuchsia-950 to-stone-950",
    coverImage: animalyBarNoHumanityImages.feature,
  },
  "20-more-somehow-even-smaller-mazes": {
    slug: "20-more-somehow-even-smaller-mazes",
    name: "20 More, Somehow Even Smaller, Mazes",
    tagline: "All 20 maze solutions on one page — codes, assembly, and ad puzzles.",
    description:
      "20 More, Somehow Even Smaller, Mazes walkthrough — tutorial through Maze 20, every solution with spoiler routes, digit codes, and the final LABYRINTH maze.",
    hubDescription:
      "Luca's full maze list — one hub page, all solutions, 100% achievement.",
    genre: "Puzzle",
    genres: ["Puzzle", "Indie", "Maze"],
    releaseYear: 2025,
    accent: "violet",
    featured: true,
    published: true,
    coverGradient: "from-violet-600 via-fuchsia-950 to-stone-950",
    coverImage: twentyMoreMazesImages.feature,
  },
  "monster-alchemy": {
    slug: "monster-alchemy",
    name: "Monster Alchemy",
    tagline: "EA route — desert, Mausoleum, Necromancer unlock, tower crafting loop.",
    description:
      "Monster Alchemy walkthrough — Marlo Town, Telepathy Gloves, Western Desert, Mausoleum, Vampire Adapt boss, Necromancer initiation, and Alchemist Tower fusion/summoning/mutation systems.",
    hubDescription:
      "Luca's Early Access route through Necromancer unlock with leaf pages for recipes, fusion tables, boss fight, and mutations.",
    genre: "RPG / Monster collecting",
    genres: ["RPG", "Crafting", "Monster collecting", "Indie"],
    releaseYear: 2025,
    accent: "rose",
    featured: true,
    published: true,
    coverGradient: "from-rose-600 via-purple-950 to-stone-950",
    coverImage: monsterAlchemyImages.feature,
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
