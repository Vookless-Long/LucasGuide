import Link from "next/link";
import { site } from "@/lib/site";

export const metadata = {
  title: "About Luca & LucasGuide",
  description: `Who runs ${site.name} — Luca's independent horror and puzzle game guides.`,
};

export default function AboutPage() {
  const { author } = site;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl font-bold text-stone-900 dark:text-white">
        About {author.name}
      </h1>
      <div className="prose-guide mt-8 space-y-6 text-stone-700 dark:text-stone-300">
        <p>
          I&apos;m <strong>{author.name}</strong> — from Germany, normal job, play games in evening.
          I make {site.name} because wikis have too much text, especially for puzzle and horror games
          where you just need the code or the room order.
        </p>

        <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
          What I play most
        </h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>Horror indies — short, mean, good atmosphere.</li>
          <li>Puzzle games — point-and-click, escape rooms, logic puzzles.</li>
          <li>Anything with codes, keys, or weird rooms that block progress.</li>
        </ul>

        <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
          What I play sometimes
        </h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>Popular action RPGs and souls-likes — when I have more free time.</li>
          <li>Roguelikes — good for a quick run after work.</li>
          <li>Big releases — only if performance is ok and game not full of filler.</li>
        </ul>
        <p>
          I skip games with bad optimisation or 30 hours padding. Life is short,{" "}
          <em>Leben ist kurz</em>.
        </p>

        <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
          How guides work here
        </h2>
        <p>
          Each game get <strong>one hub walkthrough</strong> — my full route start to finish. I only
          make extra page when something is real blocker: puzzle solution, boss pattern, hidden item.
          No 20 pages for 4-hour game.
        </p>
        <p>
          Everything is Markdown, written in my voice. English is not my first language — you maybe
          see small grammar mistake or German word slip in. That is me, not bug.
        </p>
        <p>
          Rule: if I not verify in-game, it not go on site. No fake codes, no guess coordinates.
        </p>

        <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
          Contact
        </h2>
        <ul className="list-none space-y-2 pl-0">
          {author.social.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-brand-700 hover:underline dark:text-brand-300"
              >
                {link.label}
              </a>
              <span className="text-stone-500"> — {link.hint}</span>
            </li>
          ))}
        </ul>

        <p className="text-sm text-stone-500 dark:text-stone-400">
          {site.name} is not affiliated with any publisher. All game names belong to their owners.{" "}
          <Link href="/disclaimers" className="underline hover:text-brand-600">
            Disclaimers
          </Link>
        </p>
      </div>
    </div>
  );
}
