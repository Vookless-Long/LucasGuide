export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://lucasguide.com";

export const site = {
  name: "LucasGuide",
  tagline: "Game guides by Luca — straight to the point",
  description:
    "Simple horror and puzzle walkthroughs from Luca, a German player. One hub per game, extra pages only when you get stuck.",
  url: siteUrl,
  author: {
    name: "Luca",
    handle: "LucaPlaysDE",
    location: "Cologne, Germany",
    avatarInitial: "L",
    intro: [
      "I'm Luca — I work a normal office job near Cologne and play games most evenings. I started LucasGuide because I finish a lot of horror and puzzle games, and the wikis always feel too long or written by someone who skipped half the puzzles.",
      "My main focus is **horror** and **puzzle** games — point-and-click, escape rooms, short indie horror, anything where you get stuck on a code or a weird room. I also pick up **popular games** when I have time (souls-likes, roguelikes, big releases), but those guides come slower.",
      "Each game gets one hub walkthrough — my full route. Extra pages only when something really blocks you. English is not my first language; you might see small grammar mistakes. That's me.",
    ],
    focusPrimary: ["Horror", "Puzzle", "Point-and-click", "Escape room"],
    focusSecondary: ["Roguelikes", "Action RPG", "Big releases — when time allows"],
    social: [
      {
        label: "Steam",
        href: "https://steamcommunity.com/id/lucaplaysde",
        hint: "Game library & reviews",
      },
      {
        label: "YouTube",
        href: "https://youtube.com/@LucaPlaysDE",
        hint: "Short puzzle solutions & boss clips",
      },
      {
        label: "X",
        href: "https://x.com/LucaPlaysDE",
        hint: "New guides & what I'm playing",
      },
      {
        label: "Discord",
        href: "https://discord.gg/lucaplaysde",
        hint: "Ask if you're stuck",
      },
    ],
  },
  home: {
    latestEyebrow: "New guides",
    latestTitle: "Games I am writing about now",
    latestDescription:
      "Fresh walkthrough hubs when I finish a game. Each hub is the full route — not a wiki with 50 empty pages.",
    browseAllLink: "All game hubs →",
    searchPlaceholder: "Search game, puzzle, or boss…",
    searchHint: "Game name or whatever blocks your run.",
    searchButton: "Search",
  },
  footer: {
    tagline: "Independent game guides by Luca — not affiliated with any publisher.",
    about: "About",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    disclaimers: "Disclaimers",
  },
} as const;

export type AccentColor = "rose" | "purple" | "amber" | "sky" | "violet" | "emerald";

export const accentStyles: Record<
  AccentColor,
  { badge: string; hover: string; link: string; glow: string }
> = {
  rose: {
    badge: "bg-rose-100 text-rose-800 dark:bg-rose-400/15 dark:text-rose-200",
    hover: "hover:border-rose-300 dark:hover:border-rose-300/50",
    link: "text-rose-700 dark:text-rose-200",
    glow: "from-rose-200/80 via-rose-100/40 dark:from-rose-500/20 dark:via-rose-500/5",
  },
  purple: {
    badge: "bg-purple-100 text-purple-800 dark:bg-purple-400/15 dark:text-purple-200",
    hover: "hover:border-purple-300 dark:hover:border-purple-300/50",
    link: "text-purple-700 dark:text-purple-200",
    glow: "from-purple-200/80 via-purple-100/40 dark:from-purple-500/20 dark:via-purple-500/5",
  },
  amber: {
    badge: "bg-amber-100 text-amber-900 dark:bg-amber-400/15 dark:text-amber-200",
    hover: "hover:border-amber-300 dark:hover:border-amber-300/50",
    link: "text-amber-800 dark:text-amber-200",
    glow: "from-amber-200/80 via-amber-100/40 dark:from-amber-500/20 dark:via-amber-500/5",
  },
  sky: {
    badge: "bg-sky-100 text-sky-800 dark:bg-sky-400/15 dark:text-sky-200",
    hover: "hover:border-sky-300 dark:hover:border-sky-300/50",
    link: "text-sky-700 dark:text-sky-200",
    glow: "from-sky-200/80 via-sky-100/40 dark:from-sky-500/20 dark:via-sky-500/5",
  },
  violet: {
    badge: "bg-violet-100 text-violet-800 dark:bg-violet-400/15 dark:text-violet-200",
    hover: "hover:border-violet-300 dark:hover:border-violet-300/50",
    link: "text-violet-700 dark:text-violet-200",
    glow: "from-violet-200/80 via-violet-100/40 dark:from-violet-500/20 dark:via-violet-500/5",
  },
  emerald: {
    badge: "bg-emerald-100 text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-200",
    hover: "hover:border-emerald-300 dark:hover:border-emerald-300/50",
    link: "text-emerald-700 dark:text-emerald-200",
    glow: "from-emerald-200/80 via-emerald-100/40 dark:from-emerald-500/20 dark:via-emerald-500/5",
  },
};
