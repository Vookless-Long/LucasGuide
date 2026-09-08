import Link from "next/link";
import type { ReactNode } from "react";
import { legal } from "@/lib/legal";
import { site } from "@/lib/site";

type LegalPageProps = {
  title: string;
  children: ReactNode;
};

export function LegalPage({ title, children }: LegalPageProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl font-bold text-stone-900 dark:text-white">{title}</h1>
      <p className="mt-3 text-sm text-stone-500 dark:text-stone-400">
        Last updated: {legal.lastUpdated} · {site.url.replace("https://", "")}
      </p>
      <div className="prose-guide mt-10 space-y-8 text-stone-700 dark:text-stone-300">{children}</div>
      <p className="mt-12 border-t border-stone-200 pt-8 text-sm text-stone-500 dark:border-stone-800 dark:text-stone-400">
        Questions? See{" "}
        <Link href="/about-us" className="font-medium text-brand-700 hover:underline dark:text-brand-300">
          About Luca
        </Link>{" "}
        for social links, or read our{" "}
        <Link href="/privacy-policy" className="font-medium text-brand-700 hover:underline dark:text-brand-300">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
