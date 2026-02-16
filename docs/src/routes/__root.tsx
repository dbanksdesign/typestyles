import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import { getRegisteredCss } from 'typestyles';
import { layout, header } from '../styles';

function RootComponent() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <div className={layout('page')}>
          <header className={header('root')}>
            <div className={header('inner')}>
              <Link to="/" className={header('title')}>
                typestyles
              </Link>
              <nav className={header('nav')}>
                <Link to="/" className={header('link')}>
                  Home
                </Link>
                <Link to="/docs" className={header('link')}>
                  Docs
                </Link>
              </nav>
            </div>
          </header>
          <main className={layout('main')}>
            <Outlet />
          </main>
        </div>
        <Scripts />
      </body>
    </html>
  );
}

export const Route = createRootRoute({
  head: () => {
    if (typeof document !== 'undefined') return {};

    const css = getRegisteredCss();
    if (!css) return {};

    return {
      meta: [
        { charSet: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      styles: [
        {
          tag: 'style',
          attrs: { id: 'typestyles' },
          children: css,
        },
      ],
    };
  },
  component: RootComponent,
});
