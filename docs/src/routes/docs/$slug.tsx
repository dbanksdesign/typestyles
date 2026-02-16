import { createFileRoute, Link } from '@tanstack/react-router';
import { allDocs } from 'content-collections';
import { marked } from 'marked';
import { layout, sidebar, doc, docPage } from '../../styles';
import { docNavigation, getDocNeighbors } from '../../navigation';

function getSlug(metaPath: string): string {
  return metaPath.replace(/\.md$/, '').replace(/^docs\/?/, '');
}

function DocPageComponent() {
  const { slug } = Route.useParams();
  const document = allDocs.find((d) => getSlug(d._meta.path) === slug);

  if (!document) {
    return (
      <div className={layout('main')}>
        <p>Not found.</p>
        <Link to="/docs">Back to docs</Link>
      </div>
    );
  }

  const html = marked(document.content) as string;
  const neighbors = getDocNeighbors(slug);

  return (
    <div className={layout('main')}>
      <div className={docPage('root')}>
        <aside className={sidebar('root')}>
          <Link to="/docs" className={sidebar('backLink')}>
            ← All Documentation
          </Link>
          <div className={sidebar('title')}>Documentation</div>
          {docNavigation.categories.map((category) => (
            <div key={category.slug} className={sidebar('section')}>
              <div className={sidebar('sectionTitle')}>{category.title}</div>
              {category.items.map((item) => {
                const docItem = allDocs.find((d) => getSlug(d._meta.path) === item.slug);
                if (!docItem) return null;

                const isActive = item.slug === slug;
                return (
                  <Link
                    key={item.slug}
                    to="/docs/$slug"
                    params={{ slug: item.slug }}
                    className={
                      isActive ? `${sidebar('link')} ${sidebar('linkActive')}` : sidebar('link')
                    }
                  >
                    {docItem.title}
                  </Link>
                );
              })}
            </div>
          ))}
        </aside>
        <article className={doc('root')}>
          <h1 className={doc('title')}>{document.title}</h1>
          {document.description && <p className={doc('description')}>{document.description}</p>}
          <div className={doc('content')} dangerouslySetInnerHTML={{ __html: html }} />

          {/* Pagination */}
          <div className={docPage('pagination')}>
            {neighbors.prev && (
              <Link
                to="/docs/$slug"
                params={{ slug: neighbors.prev.slug }}
                className={docPage('paginationLink')}
              >
                ← {neighbors.prev.title}
              </Link>
            )}
            {neighbors.next && (
              <Link
                to="/docs/$slug"
                params={{ slug: neighbors.next.slug }}
                className={docPage('paginationLink')}
                style={{ marginLeft: 'auto' }}
              >
                {neighbors.next.title} →
              </Link>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/docs/$slug')({
  component: DocPageComponent,
});
