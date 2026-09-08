import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";
import { legal } from "@/lib/legal";
import { site } from "@/lib/site";

export const metadata = {
  title: "Terms of Use",
  description: `Terms of use for ${site.name} — rules for using Luca's independent game guides.`,
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use">
      <p>
        Welcome to {site.name} ({site.url}). By accessing or using this website, you agree to these
        Terms of Use. If you do not agree, please do not use the site.
      </p>

      <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
        1. Who operates this site
      </h2>
      <p>
        {site.name} is an independent fan guide site run by {legal.operator}. It is{" "}
        <strong>not</strong> owned by, sponsored by, or officially connected to any game publisher,
        platform holder, or storefront. Game names, logos, and related assets are trademarks of their
        respective owners.
      </p>

      <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
        2. What we provide
      </h2>
      <p>
        We publish walkthroughs, tips, and reference information for video games — mostly horror and
        puzzle titles. Content reflects one player&apos;s verified routes and notes. Guides may
        contain spoilers, approximate counts, or steps that change after game patches.
      </p>
      <p>
        Everything on {site.name} is provided for <strong>personal, non-commercial use</strong> unless
        we give written permission otherwise.
      </p>

      <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
        3. No warranty
      </h2>
      <p>
        Guides are offered <strong>&quot;as is&quot; and &quot;as available.&quot;</strong> We work to
        keep information accurate and tested in-game, but we do not guarantee that any page is
        complete, current, error-free, or suitable for your situation. You use the site at your own
        risk.
      </p>
      <p>
        We are not responsible for lost save data, missed achievements, failed runs, account issues,
        or any other in-game or real-world outcome that follows from following (or misreading) our
        guides.
      </p>

      <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
        4. Acceptable use
      </h2>
      <p>You agree not to:</p>
      <ul className="list-disc space-y-2 pl-6">
        <li>Use the site in any way that violates applicable law or third-party rights.</li>
        <li>
          Scrape, bulk-download, or mirror the site in a way that overloads our hosting or harms
          other visitors.
        </li>
        <li>
          Attempt to break security, inject malicious code, or interfere with how the site is
          delivered.
        </li>
        <li>
          Republish large portions of our guides as if they were your own official product without
          permission.
        </li>
        <li>
          Misrepresent your relationship with {site.name}, Luca, or any game we cover.
        </li>
      </ul>
      <p>
        Short quotes with a clear link back to the original page are fine for discussion, streaming,
        or community posts.
      </p>

      <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
        5. Intellectual property
      </h2>
      <p>
        Original text, layout, and branding on {site.name} belong to {legal.operator} or licensors.
        Game screenshots and art shown in guides remain the property of their respective copyright
        holders and are used for commentary and instruction.
      </p>
      <p>
        If you believe content on this site infringes your rights, contact us through the channels
        listed on the{" "}
        <Link href="/about-us" className="font-medium text-brand-700 hover:underline dark:text-brand-300">
          About
        </Link>{" "}
        page so we can review your notice.
      </p>

      <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
        6. Advertising and links
      </h2>
      <p>
        {site.name} may display third-party advertisements (for example, through Google AdSense) and
        link to external sites such as Steam, YouTube, or Discord. We do not control third-party
        content and are not responsible for their policies, availability, or accuracy.
      </p>
      <p>
        Our{" "}
        <Link href="/privacy-policy" className="font-medium text-brand-700 hover:underline dark:text-brand-300">
          Privacy Policy
        </Link>{" "}
        explains how ads and analytics may use cookies or similar technologies.
      </p>

      <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
        7. Changes to the site and these terms
      </h2>
      <p>
        We may update guides, design, or these Terms at any time. The &quot;Last updated&quot; date at
        the top shows when these terms were last revised. Continued use after changes means you accept
        the updated Terms.
      </p>

      <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
        8. Limitation of liability
      </h2>
      <p>
        To the fullest extent permitted by law, {legal.operator} and {site.name} will not be liable
        for any indirect, incidental, special, consequential, or punitive damages, or for any loss
        of profits, data, or goodwill arising from your use of the site.
      </p>
      <p>{legal.jurisdictionNote}</p>

      <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
        9. Governing law
      </h2>
      <p>
        These Terms are governed by the laws of Germany, without regard to conflict-of-law rules.
        Mandatory consumer protections in your country of residence still apply where required by
        law.
      </p>

      <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
        10. Related policies
      </h2>
      <p>
        Please also read our{" "}
        <Link href="/privacy-policy" className="font-medium text-brand-700 hover:underline dark:text-brand-300">
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link href="/disclaimers" className="font-medium text-brand-700 hover:underline dark:text-brand-300">
          Disclaimers
        </Link>
        .
      </p>
    </LegalPage>
  );
}
