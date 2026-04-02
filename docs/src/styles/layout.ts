import { designTokens as t } from '@examples/design-system';
import { styles } from 'typestyles';

const bp = '@media (max-width: 768px)';
const tocBp = '@media (min-width: 1024px)';

const layoutBase = {
  root: styles.class('docs-layout-root', {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: t.fontFamily.sans,
    color: t.color.text.primary,
    backgroundColor: t.color.background.app,
    transition: 'background-color 0.2s ease, color 0.2s ease',
  }),
  content: styles.class('docs-layout-content', {
    flex: 1,
    minWidth: 0,
    [bp]: {
      paddingTop: '56px',
    },
  }),
  main: styles.class('docs-layout-main', {
    maxWidth: '768px',
    padding: t.space[8],
    [bp]: {
      padding: `${t.space[5]} ${t.space[4]}`,
    },
  }),
  /** Grid wrapper when `tocHeadings` are present (desktop TOC column). */
  docPageWrap: styles.class('docs-layout-docPageWrap', {
    maxWidth: '1100px',
    margin: '0 auto',
    width: '100%',
  }),
  docPageWrapWithToc: styles.class('docs-layout-docPageWrapWithToc', {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateAreas: '"toc" "main"',
    [tocBp]: {
      gridTemplateColumns: 'minmax(0, 1fr) 200px',
      gridTemplateAreas: '"main toc"',
      gap: t.space[8],
      alignItems: 'start',
    },
  }),
  mainColumn: styles.class('docs-layout-mainColumn', {
    gridArea: 'main',
    minWidth: 0,
  }),
  tocAside: styles.class('docs-layout-tocAside', {
    gridArea: 'toc',
    minWidth: 0,
    [tocBp]: {
      justifySelf: 'end',
      width: '200px',
      position: 'sticky',
      top: t.space[5],
      maxHeight: `calc(100vh - ${t.space[5]} - ${t.space[2]})`,
      overflowY: 'auto',
      paddingTop: t.space[2],
      paddingRight: t.space[1],
    },
  }),
};

export const layout = layoutBase;
