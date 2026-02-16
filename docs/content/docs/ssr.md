---
title: Server-Side Rendering (SSR)
description: Render typestyles on the server for better performance and SEO
---

# Server-Side Rendering (SSR)

TypeStyles supports SSR out of the box. Instead of injecting styles into the DOM during rendering, you can collect all the CSS on the server and include it in the HTML response.

## Basic setup

Import `collectStyles` from `typestyles/server`:

```ts
import { collectStyles } from 'typestyles/server';
import { renderToString } from 'react-dom/server';

const { html, css } = collectStyles(() => renderToString(<App />));
```

The `collectStyles` function:

1. Starts collecting CSS instead of injecting it
2. Runs your render function
3. Returns the rendered HTML and collected CSS

## Full example

Here's a complete Express.js example:

```ts
import express from 'express';
import { collectStyles } from 'typestyles/server';
import { renderToString } from 'react-dom/server';
import { App } from './App';

const app = express();

app.get('/', (req, res) => {
  const { html, css } = collectStyles(() => renderToString(<App />));

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>My App</title>
        <style id="typestyles">${css}</style>
      </head>
      <body>
        <div id="root">${html}</div>
        <script src="/client.js"></script>
      </body>
    </html>
  `);
});

app.listen(3000);
```

## How it works

During SSR:

1. **Collection mode**: When `collectStyles()` wraps your render, TypeStyles switches to collection mode
2. **CSS capture**: All styles, tokens, themes, and keyframes are captured to a buffer instead of being injected into the DOM
3. **Single style tag**: The collected CSS is returned as a single string ready to embed in your HTML

On the client:

1. **Hydration detection**: TypeStyles looks for an existing `<style id="typestyles">` element
2. **Reuse**: If found, it reuses that element and avoids re-injecting the CSS
3. **Seamless transition**: No flicker or style recalculation during hydration

## Framework-specific examples

### Next.js (App Router)

```tsx
// app/layout.tsx
import { collectStyles } from 'typestyles/server';
import { Stylesheet } from './stylesheet';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <Stylesheet />
      </head>
      <body>{children}</body>
    </html>
  );
}

// app/stylesheet.tsx
import { collectStyles } from 'typestyles/server';
import { renderToString } from 'react-dom/server';
import { YourAppContent } from './your-app-content';

export function Stylesheet() {
  // Collect styles from your app
  const { css } = collectStyles(() => renderToString(<YourAppContent />));

  return <style id="typestyles" dangerouslySetInnerHTML={{ __html: css }} />;
}
```

### Next.js (Pages Router)

```tsx
// pages/_document.tsx
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { collectStyles } from 'typestyles/server';
import { renderToString } from 'react-dom/server';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const originalRenderPage = ctx.renderPage;

    let css = '';
    ctx.renderPage = () => {
      const { css: collectedCss } = collectStyles(() => originalRenderPage());
      css = collectedCss;
      return {} as any;
    };

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style id="typestyles">{css}</style>
        </>
      ),
    };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
```

### Remix

```tsx
// app/entry.server.tsx
import type { EntryContext } from '@remix-run/node';
import { RemixServer } from '@remix-run/react';
import { renderToString } from 'react-dom/server';
import { collectStyles } from 'typestyles/server';

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const { html, css } = collectStyles(() =>
    renderToString(<RemixServer context={remixContext} url={request.url} />),
  );

  // Inject CSS before Remix handles the response
  const markup = html.replace('</head>', `<style id="typestyles">${css}</style></head>`);

  return new Response('<!DOCTYPE html>' + markup, {
    headers: { 'Content-Type': 'text/html' },
    status: responseStatusCode,
  });
}
```

## Streaming SSR

For streaming SSR, you need to collect styles before the stream starts:

```tsx
import { renderToPipeableStream } from 'react-dom/server';
import { collectStyles } from 'typestyles/server';

app.get('/', (req, res) => {
  // Pre-render to collect styles
  const { css } = collectStyles(() => renderToString(<App />));

  // Write the head with styles
  res.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <style id="typestyles">${css}</style>
      </head>
      <body>
        <div id="root">
  `);

  // Stream the actual content
  const stream = renderToPipeableStream(<App />, {
    onShellReady() {
      stream.pipe(res);
    },
  });
});
```

Note: This does render twice (once for styles, once for streaming), but it's necessary because styles are only known after the render completes.

## Important considerations

### Style deduplication

TypeStyles automatically deduplicates CSS during collection. If multiple components use the same style variant, it's only included once in the output.

### Critical CSS

All CSS is included by default. For large applications, you might want to implement critical CSS extraction (only including styles for above-the-fold content). This isn't built into TypeStyles—you'd need to implement it at the framework level.

### Client-side hydration

Always use the same `id="typestyles"` on both server and client:

```html
<!-- Server -->
<style id="typestyles">
  ${css}
</style>

<!-- Client finds and reuses this element -->
```

If the IDs don't match, you'll get duplicate styles.

### Memory and cleanup

`collectStyles()` manages collection state automatically. After the render function completes and CSS is collected, the internal state is reset. You don't need to manually clean up.

## Troubleshooting

### Styles missing in SSR output

Make sure you're actually rendering components that use typestyles during the `collectStyles()` call. If styles are defined but the component isn't rendered, no CSS will be generated.

### Styles appearing twice

This happens when the client can't find the server-rendered style tag:

1. Check that the `id` is exactly `"typestyles"`
2. Make sure the style tag is present in the initial HTML
3. Verify no ad blockers or CSP are interfering

### Flash of unstyled content (FOUC)

If you see FOUC:

1. Ensure styles are in the `<head>`, not the body
2. Check that the CSS string isn't empty
3. Verify that `collectStyles()` wraps the actual component render, not just an empty render
