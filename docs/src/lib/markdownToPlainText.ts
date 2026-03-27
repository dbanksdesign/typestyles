import { toText } from 'hast-util-to-text';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

/** Markdown → plain text for search indexing (no MDX; mirrors the Evil Martians remark pipeline). */
export async function markdownToPlainText(markdown: string): Promise<string> {
  const mdast = unified().use(remarkParse).use(remarkGfm).parse(markdown);
  const hast = await unified().use(remarkRehype).run(mdast);
  return toText(hast).replace(/\s+/g, ' ').trim();
}
