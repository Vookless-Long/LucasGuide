import type { GuideFrontmatter } from "./guides";
import { site } from "./site";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lucasguide.com";

export interface ArticleSchemaInput {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  author?: string;
}

export interface FAQSchemaInput {
  questions: { question: string; answer: string }[];
}

export function buildArticleJsonLd(input: ArticleSchemaInput): object {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: input.url,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: {
      "@type": "Person",
      name: input.author ?? "Luca",
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    ...(input.image && {
      image: input.image,
    }),
  };
}

export function buildFAQJsonLd(input: FAQSchemaInput): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: input.questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
}

export function buildBreadcrumbJsonLd(
  items: { name: string; url: string }[]
): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildWebSiteJsonLd(siteName: string): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: SITE_URL,
    description: site.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/all-guides?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function guideToArticleSchema(
  guide: GuideFrontmatter & { html?: string },
  canonicalUrl: string,
  headline?: string
): object {
  return buildArticleJsonLd({
    title: headline ?? guide.title,
    description: guide.description,
    url: canonicalUrl,
    datePublished: guide.date,
    dateModified: guide.updated ?? guide.date,
    image: guide.image,
  });
}

export function JsonLdScript({ data }: { data: object | object[] }) {
  const json = Array.isArray(data) ? data : [data];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json.length === 1 ? json[0] : json) }}
    />
  );
}
