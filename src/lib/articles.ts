// Helper reutilizable para páginas de categoría (Política, Economía,
// Geopolítica, Otros Blogs) y de subcategoría (Tecnología, y futuras
// Educación/Cultura/Deporte): obtiene los artículos publicados de una
// categoría (con subcategoría opcional), ordenados por fecha, con el autor
// ya resuelto — mismo shape que espera LatestArticles.astro.
import { getCollection, getEntry, type CollectionEntry } from "astro:content";

type Articulo = CollectionEntry<"articulos">;

export interface CategoryArticleItem {
  article: Articulo;
  author: CollectionEntry<"autores"> | null;
}

export async function getPublishedArticlesByCategory(
  category: Articulo["data"]["category"],
  subcategory?: Articulo["data"]["subcategory"],
): Promise<CategoryArticleItem[]> {
  const articles = (
    await getCollection(
      "articulos",
      ({ data }) =>
        !data.draft &&
        data.category === category &&
        (subcategory === undefined || data.subcategory === subcategory),
    )
  ).sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());

  return Promise.all(
    articles.map(async (article) => ({
      article,
      author: (await getEntry(article.data.author[0])) ?? null,
    })),
  );
}

// Artículos relacionados para la página de artículo individual (Article
// V2). Función nueva y aditiva — no modifica getPublishedArticlesByCategory
// para no arriesgar las páginas de categoría/subcategoría que ya la usan.
// Prioridad estrictamente lexicográfica (no score sumado, para que
// "misma subcategory" siempre pese más que cualquier cantidad de tags
// compartidos): 1) misma subcategory, 2) misma category, 3) cantidad de
// tags compartidos, 4) publishedAt descendente como desempate.
export async function getRelatedArticles(
  current: Articulo,
  limit = 3,
): Promise<CategoryArticleItem[]> {
  const candidates = await getCollection(
    "articulos",
    ({ id, data }) => id !== current.id && !data.draft,
  );

  const currentTags = new Set(current.data.tags);

  const sorted = candidates.sort((a, b) => {
    const subA =
      current.data.subcategory !== undefined && a.data.subcategory === current.data.subcategory
        ? 1
        : 0;
    const subB =
      current.data.subcategory !== undefined && b.data.subcategory === current.data.subcategory
        ? 1
        : 0;
    if (subB !== subA) return subB - subA;

    const catA = a.data.category === current.data.category ? 1 : 0;
    const catB = b.data.category === current.data.category ? 1 : 0;
    if (catB !== catA) return catB - catA;

    const tagsA = a.data.tags.filter((tag) => currentTags.has(tag)).length;
    const tagsB = b.data.tags.filter((tag) => currentTags.has(tag)).length;
    if (tagsB !== tagsA) return tagsB - tagsA;

    return b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf();
  });

  const top = sorted.slice(0, limit);

  return Promise.all(
    top.map(async (article) => ({
      article,
      author: (await getEntry(article.data.author[0])) ?? null,
    })),
  );
}
