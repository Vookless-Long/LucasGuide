import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  const legalLinks = [
    { href: "/about-us", label: site.footer.about },
    { href: "/privacy-policy", label: site.footer.privacy },
    { href: "/terms-of-use", label: site.footer.terms },
    { href: "/disclaimers", label: site.footer.disclaimers },
  ];

  return (
    <footer className="section-divider mt-auto bg-white dark:bg-stone-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <p className="font-display text-lg font-bold text-stone-900 dark:text-white">
              Lucas<span className="text-brand-600 dark:text-brand-400">Guide</span>
            </p>
            <p className="mt-1 max-w-md text-sm text-stone-500 dark:text-stone-400">
              {site.footer.tagline}
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-stone-600 transition-colors hover:text-brand-600 dark:text-stone-400 dark:hover:text-brand-400"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 border-t border-stone-200 pt-8 text-center dark:border-stone-800">
          <p className="text-xs text-stone-400 dark:text-stone-500">
            © {year} LucasGuide · lucasguide.com · All game names belong to their owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
