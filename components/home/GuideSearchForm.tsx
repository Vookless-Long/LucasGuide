"use client";

import { useRouter } from "next/navigation";
import { IconSearch } from "@tabler/icons-react";
import { site } from "@/lib/site";

export function GuideSearchForm() {
  const router = useRouter();

  return (
    <form
      role="search"
      className="w-full"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const q = String(data.get("q") ?? "").trim();
        router.push(q ? `/all-guides?q=${encodeURIComponent(q)}` : "/all-guides");
      }}
    >
      <label htmlFor="home-guide-search" className="sr-only">
        Search LucasGuide walkthroughs
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative min-w-0 flex-1">
          <IconSearch
            aria-hidden
            size={18}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
          />
          <input
            id="home-guide-search"
            name="q"
            type="search"
            placeholder={site.home.searchPlaceholder}
            autoComplete="off"
            className="min-h-11 w-full rounded-lg border border-stone-200 bg-white py-2.5 pl-10 pr-4 text-sm text-stone-900 outline-none placeholder:text-stone-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:border-brand-500 dark:focus:ring-brand-900"
          />
        </div>
        <button
          type="submit"
          className="min-h-11 shrink-0 rounded-lg bg-brand-600 px-5 text-sm font-bold text-white transition hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-400"
        >
          {site.home.searchButton}
        </button>
      </div>
    </form>
  );
}
