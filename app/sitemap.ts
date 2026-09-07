import type { MetadataRoute } from "next";
import { getSitemapEntries } from "@/lib/sitemap-urls";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return getSitemapEntries().map(
    ({ url, lastModified, changeFrequency, priority }) => ({
      url,
      lastModified,
      changeFrequency,
      priority,
    })
  );
}
