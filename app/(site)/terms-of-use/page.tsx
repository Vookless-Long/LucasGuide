import { site } from "@/lib/site";

export const metadata = { title: "Terms of Use", description: `${site.name} terms of use.` };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl font-bold text-stone-900 dark:text-white">Terms of Use</h1>
      <div className="prose-guide mt-8">
        <p>By using {site.name}, you agree to these terms. Content is provided as-is without warranty.</p>
      </div>
    </div>
  );
}
