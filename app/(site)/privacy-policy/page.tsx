import { site } from "@/lib/site";

export const metadata = { title: "Privacy Policy", description: `${site.name} privacy policy.` };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl font-bold text-stone-900 dark:text-white">Privacy Policy</h1>
      <div className="prose-guide mt-8">
        <p>Last updated: September 1, 2026</p>
        <p>
          {site.name} is a static guide site. We do not require accounts. Standard server logs and
          analytics may be collected by our hosting provider.
        </p>
      </div>
    </div>
  );
}
