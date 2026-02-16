import { createFileRoute, Link } from '@tanstack/react-router';
import { allDocs } from 'content-collections';
import { layout, sidebar, doc } from '../styles';
import { docNavigation } from '../../navigation';

function DocsIndexPage() {
  return (
    <div className={layout('main')} style={{ display: 'flex', gap: '24px' }}>
      <aside className={sidebar('root')}>
        <div className={sidebar('title')}>Documentation</div>
        {docNavigation.categories.map((category) => (
          <div key={category.slug} className={sidebar('section')}>
            <div className={sidebar('sectionTitle')}>{category.title}</div>
            {category.items.map((item) => {
              const doc = allDocs.find(
                (d) => d._meta.path.replace(/\.md$/, '').replace(/^docs\/?/, '') === item.slug,
              );
              if (!doc) return null;

              return (
                <Link
                  key={item.slug}
                  to="/docs/$slug"
                  params={{ slug: item.slug }}
                  className={sidebar('link')}
                >
                  {doc.title}
                </Link>
              );
            })}
          </div>
        ))}
      </aside>
      <div className={doc('root')}>
        <h1 className={doc('title')}>Documentation</h1>
        <p className={doc('description')}>
          Welcome to the typestyles documentation. Choose a topic from the sidebar or start with{' '}
          <Link to="/docs/getting-started">Getting Started</Link>.
        </p>

        <h2>Categories</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {docNavigation.categories.map((category) => (
            <div key={category.slug}>
              <h3>{category.title}</h3>
              <ul>
                {category.items.slice(0, 3).map((item) => {
                  const doc = allDocs.find(
                    (d) => d._meta.path.replace(/\.md$/, '').replace(/^docs\/?/, '') === item.slug,
                  );
                  if (!doc) return null;

                  return (
                    <li key={item.slug}>
                      <Link to="/docs/$slug" params={{ slug: item.slug }}>
                        {doc.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/docs/')({
  component: DocsIndexPage,
});
