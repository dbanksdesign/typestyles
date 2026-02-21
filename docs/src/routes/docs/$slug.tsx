import { createFileRoute, Link } from '@tanstack/react-router';
import { allDocs } from 'content-collections';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';
import { doc, docPage } from '../../styles';
import { getDocNeighbors } from '../../navigation';

const marked = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
  }),
);

function getSlug(metaPath: string): string {
  return metaPath.replace(/\.md$/, '').replace(/^docs\/?/, '');
}

function DocPageComponent() {
  const { slug } = Route.useParams();
  const document = allDocs.find((d) => getSlug(d._meta.path) === slug);

  if (!document) {
    return (
      <div>
        <p>Not found.</p>
        <Link to="/docs">Back to docs</Link>
      </div>
    );
  }

  const html = marked.parse(document.content) as string;
  const neighbors = getDocNeighbors(slug);

  return (
    <article className={doc('root')}>
      <h1 className={doc('title')}>{document.title}</h1>
      {document.description && <p className={doc('description')}>{document.description}</p>}
      <div className={doc('content')} dangerouslySetInnerHTML={{ __html: html }} />

      <div className={docPage('pagination')}>
        {neighbors.prev ? (
          <Link
            to="/docs/$slug"
            params={{ slug: neighbors.prev.slug }}
            className={docPage('paginationLink')}
          >
            &larr; {neighbors.prev.title}
          </Link>
        ) : (
          <span />
        )}
        {neighbors.next && (
          <Link
            to="/docs/$slug"
            params={{ slug: neighbors.next.slug }}
            className={docPage('paginationLink')}
            style={{ marginLeft: 'auto' }}
          >
            {neighbors.next.title} &rarr;
          </Link>
        )}
      </div>
    </article>
  );
}

export const Route = createFileRoute('/docs/$slug')({
  component: DocPageComponent,
});
