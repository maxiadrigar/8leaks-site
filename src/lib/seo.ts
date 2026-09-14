// Helpers puros de metadata SEO/social — sin fetch, sin side effects, sin
// acceder a Content Collections. Reciben datos ya resueltos (por la página
// que los llama) y devuelven strings/objetos listos para SEO.astro. Todo lo
// que dependa del dominio público pasa por resolveCanonicalUrl(), que a su
// vez depende únicamente de `site` (astro.config.mjs) — cambiar el dominio
// en el futuro (ej. a www.8leaks.com) no requiere tocar este archivo.
import { categoryLabel, subcategoryLabel } from "./content-format";

export const SITE_NAME = "8LEAKS";
export const DEFAULT_LOCALE = "es_AR";

// Único lugar donde vive la ruta del logo institucional usado en JSON-LD
// (publisher.logo). Resuelto a absoluto vía resolveSiteUrl() + Astro.site
// — cambiar el dominio en astro.config.mjs no requiere tocar esta ruta.
export const PUBLISHER_LOGO_PATH = "/brand/8leaks-logo-vertical.png";
export const PUBLISHER_LOGO_WIDTH = 1254;
export const PUBLISHER_LOGO_HEIGHT = 1254;

/**
 * URL absoluta a partir de `Astro.site` + un pathname, sin normalizar
 * trailing slash — para assets (imágenes) donde forzar "/" final rompería
 * la ruta. resolveCanonicalUrl() reutiliza esta misma función para páginas.
 * Si `site` no está configurado, devuelve undefined en vez de fabricar una
 * URL relativa o apuntar a localhost.
 */
export function resolveSiteUrl(site: URL | undefined, pathname: string): string | undefined {
  if (!site) return undefined;
  return new URL(pathname, site).toString();
}

/**
 * URL absoluta canónica a partir de `Astro.site` + un pathname (sin query
 * ni hash — un canonical no debe incluirlos). Siempre termina en "/",
 * coherente con la convención de trailing slash ya vigente en producción
 * (Cloudflare redirige sin-slash -> con-slash con 308). Si `site` no está
 * configurado, devuelve undefined en vez de fabricar una URL relativa o
 * apuntar a localhost — el caller decide si renderizar o no el canonical.
 */
export function resolveCanonicalUrl(site: URL | undefined, pathname: string): string | undefined {
  const normalizedPath = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return resolveSiteUrl(site, normalizedPath);
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

export interface ArticleJsonLdAuthor {
  id: string;
  name: string;
}

export interface ArticleJsonLdParams {
  headline: string;
  description: string;
  publishedAt: Date;
  updatedAt?: Date;
  authors: ArticleJsonLdAuthor[];
  publisherLogoUrl?: string;
  canonicalUrl?: string;
  image: string;
  articleSection: string;
  tags: string[];
}

/**
 * JSON-LD `Article` para una página de artículo individual (SEO-C). Recibe
 * datos ya resueltos por el caller — sin fetch, sin acceso a Content
 * Collections, sin Astro globals — para mantener la misma filosofía que
 * buildArticleOpenGraph().
 *
 * La detección Person/Organization por `id === "8leaks"` es deliberadamente
 * temporal: hoy es la única entidad institucional en la colección
 * `autores`. Si en el futuro aparece un segundo autor institucional,
 * reemplazar esta heurística por un campo explícito del schema (ver
 * auditoría SEO-C) en vez de sumar más ids a esta condición.
 */
export function buildArticleJsonLd(params: ArticleJsonLdParams): Record<string, unknown> {
  const {
    headline,
    description,
    publishedAt,
    updatedAt,
    authors,
    publisherLogoUrl,
    canonicalUrl,
    image,
    articleSection,
    tags,
  } = params;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    datePublished: publishedAt.toISOString(),
    dateModified: (updatedAt ?? publishedAt).toISOString(),
    author: authors.map((author) => ({
      "@type": author.id === "8leaks" ? "Organization" : "Person",
      name: author.name,
    })),
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: publisherLogoUrl,
        width: PUBLISHER_LOGO_WIDTH,
        height: PUBLISHER_LOGO_HEIGHT,
      },
    },
    mainEntityOfPage: canonicalUrl,
    image,
    articleSection,
    keywords: tags.join(", "),
  };
}
