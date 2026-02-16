import { createFileRoute } from '@tanstack/react-router';
import { layout, doc } from '../styles';

function HomePage() {
  return (
    <div className={layout('main')}>
      <h1 className={doc('title')}>typestyles</h1>
      <p className={doc('description')}>
        CSS-in-TypeScript that embraces CSS instead of hiding from it. Design tokens, style variants, and keyframes — with full control over the CSS.
      </p>
      <p>
        <a href="/docs/getting-started" className={doc('content')}>
          Get started →
        </a>
      </p>
    </div>
  );
}

export const Route = createFileRoute('/')({
  component: HomePage,
});
