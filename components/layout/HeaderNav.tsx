import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

export type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number; stroke?: number; className?: string }>;
};

export function HeaderNav({
  navItems,
  logoHref,
}: {
  navItems: NavItem[];
  logoHref: string;
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-white/85 backdrop-blur-lg dark:border-stone-800 dark:bg-stone-950/85">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href={logoHref} className="group flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 text-sm font-bold text-white shadow-glow">
            L
          </div>
          <div className="hidden sm:block">
            <span className="font-display text-lg font-bold tracking-tight text-stone-900 dark:text-white">
              Lucas<span className="text-brand-600 dark:text-brand-400">Guide</span>
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-brand-600 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-brand-400"
              >
                <Icon size={16} stroke={1.75} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>

      <nav
        className="flex gap-1 overflow-x-auto border-t border-stone-100 px-4 py-2 lg:hidden dark:border-stone-800"
        aria-label="Mobile"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "inline-flex shrink-0 items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium text-stone-600 dark:text-stone-400"
              )}
            >
              <Icon size={14} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
