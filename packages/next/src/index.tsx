import React, { useEffect, useState } from 'react';
import { collectStyles, getRegisteredCss } from 'typestyles/server';

export { getRegisteredCss };

/**
 * Props for the TypestylesStylesheet component.
 */
export interface TypestylesStylesheetProps {
  /**
   * The children to render (styles will be collected from these).
   * If not provided, only the existing registered CSS will be included.
   */
  children?: React.ReactNode;
}

/**
 * A React component that renders typestyles CSS.
 *
 * For App Router: Use this in your root layout to collect and render styles.
 *
 * @example
 * ```tsx
 * // app/layout.tsx
 * import { TypestylesStylesheet } from '@typestyles/next';
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <head>
 *         <TypestylesStylesheet />
 *       </head>
 *       <body>{children}</body>
 *     </html>
 *   );
 * }
 * ```
 */
export function TypestylesStylesheet({ children }: TypestylesStylesheetProps) {
  const [css, setCss] = useState('');

  useEffect(() => {
    // On client: get any CSS that was registered before hydration
    setCss(getRegisteredCss());
  }, []);

  if (children) {
    return (
      <>
        {children}
        <style id="typestyles" dangerouslySetInnerHTML={{ __html: css }} />
      </>
    );
  }

  return <style id="typestyles" dangerouslySetInnerHTML={{ __html: css }} />;
}

/**
 * Collect styles from a React component and return them as a string.
 * Useful for server components or when you need more control.
 *
 * @example
 * ```tsx
 * // app/styles.ts
 * import { collectStylesFromComponent } from '@typestyles/next';
 * import { YourApp } from './YourApp';
 *
 * export async function getStyles() {
 *   return collectStylesFromComponent(<YourApp />);
 * }
 * ```
 */
export async function collectStylesFromComponent(component: React.ReactElement): Promise<string> {
  const { renderToString } = await import('react-dom/server');
  const { css } = collectStyles(() => renderToString(component));
  return css;
}

/**
 * Create a Next.js layout export that includes typestyles.
 *
 * @example
 * ```tsx
 * // app/layout.tsx
 * import { createTypestylesLayout } from '@typestyles/next';
 *
 * export default createTypestylesLayout(function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <head>
 *         <title>My App</title>
 *       </head>
 *       <body>{children}</body>
 *     </html>
 *   );
 * });
 * ```
 */
export function createTypestylesLayout<P extends { children?: React.ReactNode }>(
  layout: (props: P) => React.ReactNode,
): (props: P) => React.ReactNode {
  return function TypestylesLayout(props: P) {
    return <TypestylesStylesheet>{layout(props)}</TypestylesStylesheet>;
  };
}
