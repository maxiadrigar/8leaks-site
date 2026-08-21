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
