import Link from "next/link";
import {
  IconBrandDiscord,
  IconBrandSteam,
  IconBrandX,
  IconBrandYoutube,
  IconMapPin,
} from "@tabler/icons-react";
import { site } from "@/lib/site";

const socialIcons: Record<string, React.ComponentType<{ size?: number; stroke?: number }>> = {
  Steam: IconBrandSteam,
  YouTube: IconBrandYoutube,
  X: IconBrandX,
  Discord: IconBrandDiscord,
};

function renderIntroParagraph(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-stone-900 dark:text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export function HomeProfile() {
  const { author } = site;

  return (
    <section aria-labelledby="home-profile-title" className="px-4 py-12 md:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12">
          <div className="min-w-0">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <div
                aria-hidden
                className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 text-3xl font-bold text-white shadow-md sm:h-24 sm:w-24 sm:text-4xl"
              >
                {author.avatarInitial}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700 dark:text-brand-300">
                  {site.name}
                </p>
                <h1
                  id="home-profile-title"
                  className="mt-2 font-display text-3xl font-bold tracking-tight text-stone-900 dark:text-white md:text-4xl"
                >
                  Hi, I&apos;m {author.name}
                </h1>
                <p className="mt-2 inline-flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-stone-500 dark:text-stone-400">
                  <IconMapPin size={15} stroke={1.75} aria-hidden />
                  {author.location}
                  <span aria-hidden>·</span>
                  <span>@{author.handle}</span>
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-4 text-base leading-relaxed text-stone-600 dark:text-stone-300">
              {author.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{renderIntroParagraph(paragraph)}</p>
              ))}
            </div>

            <p className="mt-8 text-sm text-stone-500 dark:text-stone-400">
              More about how I write guides:{" "}
              <Link href="/about-us" className="font-medium text-brand-700 hover:underline dark:text-brand-300">
                About page
              </Link>
            </p>
          </div>

          <aside className="min-w-0 lg:border-l lg:border-stone-200 lg:pl-10 dark:lg:border-stone-800">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-stone-500 dark:text-stone-400">
                Mostly play
              </p>
              <ul className="mt-2 flex flex-wrap gap-2 lg:flex-col lg:items-start">
                {author.focusPrimary.map((tag) => (
                  <li key={tag}>
                    <span className="inline-flex rounded-md bg-brand-100 px-2.5 py-1 text-xs font-semibold text-brand-800 dark:bg-brand-400/15 dark:text-brand-200">
                      {tag}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-stone-500 dark:text-stone-400">
                Sometimes
              </p>
              <ul className="mt-2 flex flex-wrap gap-2 lg:flex-col lg:items-start">
                {author.focusSecondary.map((tag) => (
                  <li key={tag}>
                    <span className="inline-flex rounded-md border border-stone-200 bg-white px-2.5 py-1 text-xs font-medium text-stone-600 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300">
                      {tag}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-stone-500 dark:text-stone-400">
                Find me
              </p>
              <ul className="mt-3 flex flex-wrap gap-2 lg:flex-col lg:items-stretch">
                {author.social.map((link) => {
                  const Icon = socialIcons[link.label];
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={link.hint}
                        className="inline-flex w-full items-center gap-2 rounded-lg border border-stone-200 bg-white px-3.5 py-2 text-sm font-medium text-stone-700 transition hover:border-brand-300 hover:text-brand-700 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:border-brand-600 dark:hover:text-brand-300 lg:w-full"
                      >
                        {Icon && <Icon size={18} stroke={1.75} aria-hidden />}
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
