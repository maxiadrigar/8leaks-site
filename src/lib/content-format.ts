// Presentación compartida entre Hero y ArticleRow: mismas etiquetas de
// categoría y mismo formato de fecha en toda la Home.

export const CATEGORY_LABELS: Record<string, string> = {
  politica: "Política",
  economia: "Economía",
  geopolitica: "Geopolítica",
  sociedad: "Sociedad",
  "psicologia-comportamiento": "Psicología",
  "analisis-opinion": "Análisis y opinión",
};

const dateFormatter = new Intl.DateTimeFormat("es-AR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function formatArticleDate(date: Date): string {
  return dateFormatter.format(date);
}

export function categoryLabel(category: string): string {
  return CATEGORY_LABELS[category] ?? category;
}
