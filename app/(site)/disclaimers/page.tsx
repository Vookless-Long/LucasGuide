import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";
import { legal } from "@/lib/legal";
import { site } from "@/lib/site";

export const metadata = {
  title: "Disclaimers",
  description: `Affiliation, accuracy, and liability disclaimers for ${site.name}.`,
};

export default function DisclaimersPage() {
  return (
    <LegalPage title="Disclaimers">
      <p>
        {site.name} is a personal fan guide project. Please read these disclaimers together with our{" "}
        <Link href="/terms-of-use" className="font-medium text-brand-700 hover:underline dark:text-brand-300">
          Terms of Use
        </Link>{" "}
        and{" "}
        <Link href="/privacy-policy" className="font-medium text-brand-700 hover:underline dark:text-brand-300">
          Privacy Policy
        </Link>
        .
      </p>

      <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
        Not affiliated with publishers
      </h2>
      <p>
        {site.name} is <strong>not affiliated with, endorsed by, or sponsored by</strong> any game
        developer, publisher, platform owner, or storefront mentioned on this site — including but
        not limited to titles we write guides for.
      </p>
      <p>
        All game names, logos, characters, and related assets are trademarks and copyright of their
        respective owners. Their use on {site.name} is for identification and commentary only.
      </p>

      <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
        Unofficial guides
      </h2>
      <p>
        Walkthroughs reflect {site.author.name}&apos;s own playthroughs and notes. They are{" "}
        <strong>unofficial</strong> and may differ from wikis, developer materials, or other
        players&apos; experiences.
      </p>
      <p>
        Game patches, regional versions, platform-specific bugs, or multiplayer (Beta) features can
        change counts, spawn locations, achievement triggers, or UI text without notice. Always
        double-check in your own save if something looks wrong.
      </p>

      <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
        Accuracy and completeness
      </h2>
      <p>
        We aim to verify steps in-game before publishing. Still, we do not warrant that any guide is
        complete, perfectly ordered, or free of typos — including small English grammar mistakes in
        Luca&apos;s voice.
      </p>
      <p>Examples of information that may be incomplete or in progress:</p>
      <ul className="list-disc space-y-2 pl-6">
        <li>Stages or modes Luca has not finished solo yet (we say so plainly on the hub)</li>
        <li>Community-sourced bay lists pending more verification</li>
        <li>Achievement thresholds that differ between platform or patch versions</li>
      </ul>

      <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
        Spoilers
      </h2>
      <p>
        Guides describe puzzles, story beats, boss patterns, and endings. If you want a blind
        first playthrough, read at your own risk.
      </p>

      <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
        No professional advice
      </h2>
      <p>
        Content on {site.name} is for entertainment and hobby gaming only. It is not legal, financial,
        medical, or technical professional advice.
      </p>

      <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
        Third-party links and tools
      </h2>
      <p>
        Links to Steam, Discord, YouTube, or other services are provided for convenience. We do not
        control those services and are not responsible for their content, terms, or availability.
      </p>
      <p>
        Save editing, mods, cheats, or third-party tools mentioned in passing are your responsibility.
        Using them may violate a game&apos;s terms of service or disable achievements.
      </p>

      <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
        Advertising disclaimer
      </h2>
      <p>
        {site.name} may display advertisements (such as Google AdSense). Ad content is selected by
        ad networks. An ad for a game or product does not mean we endorse it.
      </p>
      <p>
        Some outbound links (for example, to Steam store pages) may be standard URLs without
        affiliate tracking. If affiliate links are added in the future, this section will be updated.
      </p>

      <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
        Limitation of liability
      </h2>
      <p>
        Use of {site.name} and reliance on any guide is at your sole risk. To the maximum extent
        allowed by law, {legal.operator} is not liable for any damages or losses connected with your
        use of this site or the games we discuss.
      </p>
      <p>{legal.jurisdictionNote}</p>

      <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
        Corrections
      </h2>
      <p>
        Found a wrong shelf count, outdated patch note, or broken screenshot? Tell us on{" "}
        <Link href="/about-us" className="font-medium text-brand-700 hover:underline dark:text-brand-300">
          Discord or social links
        </Link>{" "}
        — we fix verified mistakes when we can.
      </p>
    </LegalPage>
  );
}
