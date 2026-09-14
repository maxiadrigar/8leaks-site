// Helpers puros de metadata SEO/social — sin fetch, sin side effects, sin
// acceder a Content Collections. Reciben datos ya resueltos (por la página
// que los llama) y devuelven strings/objetos listos para SEO.astro. Todo lo
// que dependa del dominio público pasa por resolveCanonicalUrl(), que a su
// vez depende únicamente de `site` (astro.config.mjs) — cambiar el dominio
// en el futuro (ej. a www.8leaks.com) no requiere tocar este archivo.
import { categoryLabel, subcategoryLabel } from "./content-format";

export const SITE_NAME = "8LEAKS";
export const DEFAULT_LOCALE = "es_AR";

/**
 * URL absoluta canónica a partir de `Astro.site` + un pathname (sin query
 * ni hash — un canonical no debe incluirlos). Siempre termina en "/",
 * coherente con la convención de trailing slash ya vigente en producción
 * (Cloudflare redirige sin-slash -> con-slash con 308). Si `site` no está
 * configurado, devuelve undefined en vez de fabricar una URL relativa o
 * apuntar a localhost — el caller decide si renderizar o no el canonical.
 */
export function resolveCanonicalUrl(site: URL | undefined, pathname: string): string | undefined {
  if (!site) return undefined;
  const normalizedPath = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return new URL(normalizedPath, site).toString();
}

export interface ArticleOpenGraphData {
  section: string;
  tags: string[];
  publishedTime: string;
  modifiedTime?: string;
}

/**
 * Metadata OG específica de artículo (article:section, article:tag,
 * fechas ISO 8601). articleSection reutiliza la misma prioridad que el
 * eyebrow visual de ArticleHeader (subcategory > category) vía
 * subcategoryLabel()/categoryLabel() de content-format.ts — no introduce
 * una regla de negocio nueva. modifiedTime se omite (no se iguala a
 * publishedTime) cuando updatedAt no existe.
 */
export function buildArticleOpenGraph(data: {
  category: string;
  subcategory?: string;
  tags: string[];
  publishedAt: Date;
  updatedAt?: Date;
}): ArticleOpenGraphData {
  return {
    section: data.subcategory ? subcategoryLabel(data.subcategory) : categoryLabel(data.category),
    tags: data.tags,
    publishedTime: data.publishedAt.toISOString(),
    modifiedTime: data.updatedAt ? data.updatedAt.toISOString() : undefined,
  };
}
