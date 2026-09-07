import { Suspense } from "react";
import { Breadcrumbs } from "@/components/ui/GuideComponents";
import { AllGuidesList } from "@/components/home/AllGuidesList";
import { GuideSearchForm } from "@/components/home/GuideSearchForm";
import { getGameHubSummariesSorted } from "@/lib/guides";
import { site } from "@/lib/site";

export const metadata = {
  title: "All Game Guides",
  description: "Every game Luca has routed on LucasGuide — full hub walkthroughs plus blocker pages.",
};

export default function AllGuidesPage() {
  const hubs = getGameHubSummariesSorted();

  return (
    <div className="min-h-[60vh] bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-white">
      <div className="container mx-auto max-w-6xl px-4 py-10 md:py-14">
        <Breadcrumbs items={[{ label: site.name, href: "/" }, { label: "All Game Guides" }]} />

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-stone-900 dark:text-white md:text-4xl">
          All game guides
        </h1>
        <p className="mt-3 max-w-2xl text-stone-600 dark:text-stone-400">
          Horror and puzzle games first — plus roguelikes and action RPGs when Luca has time.
        </p>

        <div className="mt-6 max-w-xl">
          <GuideSearchForm />
        </div>

        <Suspense fallback={<p className="mt-4 text-stone-600 dark:text-stone-400">Loading guides…</p>}>
          <AllGuidesList hubs={hubs} />
        </Suspense>
      </div>
    </div>
  );
}
