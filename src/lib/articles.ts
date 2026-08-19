// Helper reutilizable para páginas de categoría (Política, y luego Economía,
// Geopolítica, Otros Blogs): obtiene los artículos publicados de una
// categoría, ordenados por fecha, con el autor ya resuelto — mismo shape
// que espera LatestArticles.astro.
import { getCollection, getEntry, type CollectionEntry } from "astro:content";

type Articulo = CollectionEntry<"articulos">;

export interface CategoryArticleItem {
  article: Articulo;
  author: CollectionEntry<"autores"> | null;
}

export async function getPublishedArticlesByCategory(
  category: Articulo["data"]["category"],
): Promise<CategoryArticleItem[]> {
  const articles = (
    await getCollection("articulos", ({ data }) => !data.draft && data.category === category)
  ).sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());

  return Promise.all(
    articles.map(async (article) => ({
      article,
      author: (await getEntry(article.data.author[0])) ?? null,
    })),
  );
}
