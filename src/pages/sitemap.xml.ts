// Sitemap manual (SEO-D) — V1 simple: solo <loc>, sin lastmod/changefreq/
// priority. Reutiliza resolveCanonicalUrl() de lib/seo.ts (misma fuente de
// verdad que canonical/og:url/JSON-LD) para que el dominio dependa
// únicamente de `site` (astro.config.mjs) — cambiarlo ahí no requiere
// tocar este archivo.
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { resolveCanonicalUrl } from "../lib/seo";

const STATIC_PATHS = [
  "/",
  "/politica",
  "/economia",
  "/geopolitica",
  "/otros-blogs",
  "/otros-blogs/educacion",
  "/otros-blogs/tecnologia",
  "/otros-blogs/cultura",
  "/otros-blogs/deporte",
];

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const GET: APIRoute = async ({ site }) => {
  const articles = await getCollection(
    "articulos",
    ({ data }) => !data.draft && data.seo?.noindex !== true,
  );

  const urls = [
    ...STATIC_PATHS.map((path) => resolveCanonicalUrl(site, path)),
    ...articles.map((article) => resolveCanonicalUrl(site, `/articulos/${article.id}`)),
  ].filter((url): url is string => Boolean(url));

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url>\n    <loc>${escapeXml(url)}</loc>\n  </url>`).join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml" },
  });
};
