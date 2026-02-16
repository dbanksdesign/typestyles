import { styles } from 'typestyles';
import { color, space, font } from './tokens';

export const layout = styles.create('docs-layout', {
  page: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: font.sans,
    color: color.text,
    backgroundColor: color.surface,
  },
  main: {
    flex: 1,
    maxWidth: '900px',
    width: '100%',
    margin: '0 auto',
    padding: space.xl,
  },
});

export const header = styles.create('docs-header', {
  root: {
    borderBottom: `1px solid ${color.border}`,
    backgroundColor: color.surfaceRaised,
  },
  inner: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: `${space.md} ${space.xl}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space.lg,
  },
  title: {
    fontSize: '20px',
    fontWeight: 700,
    color: color.text,
    textDecoration: 'none',
    '&:hover': { color: color.primary },
  },
  nav: {
    display: 'flex',
    gap: space.lg,
    alignItems: 'center',
  },
  link: {
    fontSize: '14px',
    color: color.textMuted,
    textDecoration: 'none',
    '&:hover': { color: color.primary },
  },
});

export const sidebar = styles.create('docs-sidebar', {
  root: {
    width: '240px',
    flexShrink: 0,
    paddingRight: space.lg,
    borderRight: `1px solid ${color.border}`,
  },
  backLink: {
    display: 'block',
    fontSize: '13px',
    color: color.textMuted,
    textDecoration: 'none',
    marginBottom: space.md,
    '&:hover': { color: color.primary },
  },
  title: {
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: color.textMuted,
    marginBottom: space.sm,
  },
  section: {
    marginBottom: space.md,
  },
  sectionTitle: {
    fontSize: '12px',
    fontWeight: 600,
    color: color.textMuted,
    marginBottom: space.xs,
    marginTop: space.sm,
  },
  link: {
    display: 'block',
    fontSize: '14px',
    color: color.textMuted,
    textDecoration: 'none',
    padding: `${space.xs} 0`,
    paddingLeft: space.sm,
    '&:hover': { color: color.primary },
  },
  linkActive: {
    color: color.primary,
    fontWeight: 500,
    borderLeft: `2px solid ${color.primary}`,
    paddingLeft: `calc(${space.sm} - 2px)`,
  },
});

export const doc = styles.create('docs-doc', {
  root: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontSize: '32px',
    fontWeight: 700,
    marginBottom: space.sm,
    color: color.text,
  },
  description: {
    fontSize: '16px',
    color: color.textMuted,
    marginBottom: space.xl,
    lineHeight: 1.5,
  },
  content: {
    fontSize: '15px',
    lineHeight: 1.7,
    color: color.text,
    '& h2': { fontSize: '24px', fontWeight: 600, marginTop: space.xl, marginBottom: space.sm },
    '& h3': { fontSize: '18px', fontWeight: 600, marginTop: space.lg, marginBottom: space.xs },
    '& p': { marginBottom: space.md },
    '& ul': { marginBottom: space.md, paddingLeft: space.lg },
    '& li': { marginBottom: space.xs },
    '& code': {
      fontFamily: font.mono,
      fontSize: '13px',
      backgroundColor: color.surfaceRaised,
      padding: `2px ${space.xs}`,
      borderRadius: '4px',
      border: `1px solid ${color.border}`,
    },
    '& pre': {
      fontFamily: font.mono,
      fontSize: '13px',
      backgroundColor: color.surfaceRaised,
      padding: space.md,
      borderRadius: '8px',
      border: `1px solid ${color.border}`,
      overflow: 'auto',
      marginBottom: space.md,
    },
    '& pre code': { backgroundColor: 'transparent', padding: 0, border: 'none' },
  },
});

export const docPage = styles.create('docs-doc-page', {
  root: {
    display: 'flex',
    gap: space.xl,
    alignItems: 'flex-start',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: space.xl,
    paddingTop: space.lg,
    borderTop: `1px solid ${color.border}`,
  },
  paginationLink: {
    fontSize: '14px',
    color: color.primary,
    textDecoration: 'none',
    padding: `${space.sm} ${space.md}`,
    borderRadius: '6px',
    border: `1px solid ${color.border}`,
    '&:hover': {
      backgroundColor: color.surfaceRaised,
      borderColor: color.primary,
    },
  },
});
