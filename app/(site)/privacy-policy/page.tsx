import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";
import { legal } from "@/lib/legal";
import { site } from "@/lib/site";

export const metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} handles data, cookies, analytics, and advertising.`,
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        This Privacy Policy explains what information may be collected when you visit {site.name} (
        {site.url}) and how it is used. We keep things simple: this is a static guide site with no
        user accounts and no comment system.
      </p>

      <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
        1. Who is responsible
      </h2>
      <p>
        The operator of {site.name} is {legal.operator}. For privacy-related questions, use the
        contact options on our{" "}
        <Link href="/about-us" className="font-medium text-brand-700 hover:underline dark:text-brand-300">
          About
        </Link>{" "}
        page (Steam, YouTube, X, Discord).
      </p>

      <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
        2. What we do not collect directly
      </h2>
      <p>{site.name} does not offer:</p>
      <ul className="list-disc space-y-2 pl-6">
        <li>User registration or login</li>
        <li>Newsletter signup forms</li>
        <li>Comment or forum features</li>
        <li>A shopping cart or payment processing on this domain</li>
      </ul>
      <p>
        We do not ask you to submit your name, email, or address to read guides.
      </p>

      <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
        3. Hosting and server logs
      </h2>
      <p>
        The site is hosted on Cloudflare Pages (and related Cloudflare network services). Like most
        websites, our host may automatically process technical data when you request a page, such
        as:
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>IP address (often truncated or anonymized in analytics views)</li>
        <li>Browser type and device information</li>
        <li>Referring URL and pages visited</li>
        <li>Date, time, and HTTP status of requests</li>
      </ul>
      <p>
        This data is used to deliver the site, prevent abuse, and measure performance. See{" "}
        <a
          href="https://www.cloudflare.com/privacypolicy/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-brand-700 hover:underline dark:text-brand-300"
        >
          Cloudflare&apos;s Privacy Policy
        </a>{" "}
        for details on their processing.
      </p>

      <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
        4. Analytics
      </h2>
      <p>
        We may use privacy-focused or standard web analytics to understand traffic (for example, which
        guides are read most). Analytics tools typically use cookies or similar identifiers. Where
        required, we rely on consent mechanisms provided by the analytics or advertising platform.
      </p>
      <p>
        You can limit tracking through your browser settings, private browsing mode, or opt-out tools
        offered by analytics providers.
      </p>

      <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
        5. Advertising (Google AdSense)
      </h2>
      <p>
        {site.name} may show ads served by Google AdSense or other ad partners. Google and its
        partners may use cookies and similar technologies to serve ads based on your prior visits to
        this site or other sites.
      </p>
      <p>
        Our authorized digital seller record is published at{" "}
        <Link href="/ads.txt" className="font-medium text-brand-700 hover:underline dark:text-brand-300">
          {site.url}/ads.txt
        </Link>
        .
      </p>
      <p>
        You can learn how Google uses data at{" "}
        <a
          href="https://policies.google.com/technologies/partner-sites"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-brand-700 hover:underline dark:text-brand-300"
        >
          Google&apos;s partner sites policy
        </a>{" "}
        and manage ad personalization at{" "}
        <a
          href="https://adssettings.google.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-brand-700 hover:underline dark:text-brand-300"
        >
          Google Ads Settings
        </a>
        .
      </p>

      <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
        6. Cookies and local storage
      </h2>
      <p>Cookies or local storage on {site.name} may be used for:</p>
      <ul className="list-disc space-y-2 pl-6">
        <li>Remembering dark/light theme preference (via your browser)</li>
        <li>Advertising and frequency capping</li>
        <li>Basic analytics</li>
        <li>Security and CDN delivery (Cloudflare)</li>
      </ul>
      <p>
        You can block or delete cookies in your browser. Some features (such as theme memory or ad
        personalization) may not work if cookies are disabled.
      </p>

      <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
        7. External links
      </h2>
      <p>
        Guides link to third-party sites (Steam, YouTube, publisher pages, etc.). Those sites have
        their own privacy policies. We are not responsible for how they handle your data.
      </p>

      <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
        8. Children
      </h2>
      <p>
        {site.name} is not directed at children under 16. We do not knowingly collect personal
        information from children. If you believe a child has provided personal data through a
        third-party service linked from our site, please contact us via the About page.
      </p>

      <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
        9. Your rights (EEA / UK / similar regions)
      </h2>
      <p>
        If you are in the European Economic Area, UK, or another region with data-protection laws,
        you may have rights to access, correct, delete, or restrict processing of personal data
        about you — depending on who holds that data (often our hosting or ad/analytics providers,
        not {site.name} directly).
      </p>
      <p>
        To exercise rights against Google as an ad/analytics provider, use Google&apos;s privacy
        tools linked above. For Cloudflare processing, see their policy. You may also lodge a
        complaint with your local data-protection authority.
      </p>
      <p>{legal.jurisdictionNote}</p>

      <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
        10. Data retention
      </h2>
      <p>
        We do not maintain a user database on {site.name}. Log and analytics data retained by
        Cloudflare, Google, or other processors is governed by their retention schedules.
      </p>

      <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
        11. Changes to this policy
      </h2>
      <p>
        We may update this Privacy Policy when our tools, ads setup, or legal requirements change.
        The date at the top of this page shows the latest revision.
      </p>

      <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
        12. Related documents
      </h2>
      <p>
        See also{" "}
        <Link href="/terms-of-use" className="font-medium text-brand-700 hover:underline dark:text-brand-300">
          Terms of Use
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
