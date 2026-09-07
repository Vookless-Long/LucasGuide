import { site } from "@/lib/site";

export const metadata = { title: "Disclaimers", description: `${site.name} disclaimers.` };

export default function DisclaimersPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl font-bold text-stone-900 dark:text-white">Disclaimers</h1>
      <div className="prose-guide mt-8">
        <p>
          {site.name} is not affiliated with any game publisher. All trademarks belong to their
          respective owners.
        </p>
      </div>
    </div>
  );
}
