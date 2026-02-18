import { createFileRoute, Link } from '@tanstack/react-router';
import { allDocs } from 'content-collections';
import { doc } from '../../styles';
import { docNavigation } from '../../navigation';

function DocsIndexPage() {
  return (
    <div className={doc('root')}>
      <h1 className={doc('title')}>Documentation</h1>
      <p className={doc('description')}>
        Welcome to the typestyles documentation. Choose a topic from the sidebar or start with{' '}
        <Link to="/docs/$slug" params={{ slug: 'getting-started' }}>
          Getting Started
        </Link>
        .
      </p>

      <div className={doc('content')}>
        {docNavigation.categories.map((category) => (
          <div key={category.slug}>
            <h2>{category.title}</h2>
            <ul>
              {category.items.map((item) => {
                const d = allDocs.find(
                  (doc) => doc._meta.path.replace(/\.md$/, '').replace(/^docs\/?/, '') === item.slug,
                );
                if (!d) return null;

                return (
                  <li key={item.slug}>
                    <Link to="/docs/$slug" params={{ slug: item.slug }}>
                      {d.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export const Route = createFileRoute('/docs/')({
  component: DocsIndexPage,
});
