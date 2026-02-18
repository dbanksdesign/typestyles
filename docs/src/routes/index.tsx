import { createFileRoute, Link } from '@tanstack/react-router';
import { home } from '../styles';

function HomePage() {
  return (
    <div className={home('hero')}>
      <h1 className={home('title')}>
        CSS-in-TypeScript that
        <br />
        <span className={home('titleAccent')}>embraces CSS</span>
      </h1>
      <p className={home('subtitle')}>
        Design tokens, style variants, and keyframes — with full control over the CSS. No runtime
        overhead, no magic, just types.
      </p>
      <div className={home('actions')}>
        <Link to="/docs/$slug" params={{ slug: 'getting-started' }} className={home('cta')}>
          Get started
          <span aria-hidden="true">&rarr;</span>
        </Link>
        <a
          href="https://github.com/typestyles/typestyles"
          className={home('ctaSecondary')}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/')({
  component: HomePage,
});
