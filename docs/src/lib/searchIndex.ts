import { extractDocHeadings, getAllDocs } from './docs';
import { markdownToPlainText } from './markdownToPlainText';
import { findDoc } from '../navigation';

export type SearchIndexItem = {
  slug: string;
  title: string;
  /** Sidebar section title (e.g. "Getting Started") for command palette rows. */
  categoryTitle: string;
  description?: string;
  headings: string[];
  body: string;
};

export async function buildSearchIndex(): Promise<SearchIndexItem[]> {
  const docs = await getAllDocs();
  return Promise.all(
    docs.map(async (entry) => {
      const body = await markdownToPlainText(entry.content);
      const headings = extractDocHeadings(entry.html).map((h) => h.text);
      const nav = findDoc(entry.slug);
      const categoryTitle = nav?.category.title ?? 'Documentation';
      return {
        slug: `/docs/${entry.slug}`,
        title: entry.title,
        categoryTitle,
        ...(entry.description ? { description: entry.description } : {}),
        headings,
        body,
      };
    }),
  );
}
