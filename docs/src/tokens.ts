import { tokens } from 'typestyles';

export const color = tokens.create('docs-color', {
  primary: '#2563eb',
  primaryHover: '#1d4ed8',
  surface: '#ffffff',
  surfaceRaised: '#f8fafc',
  text: '#0f172a',
  textMuted: '#64748b',
  border: '#e2e8f0',
  link: '#2563eb',
  linkHover: '#1d4ed8',
});

export const space = tokens.create('docs-space', {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
});

export const font = tokens.create('docs-font', {
  sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  mono: 'ui-monospace, "Cascadia Code", "Source Code Pro", monospace',
});

export const darkTheme = tokens.createTheme('docs-dark', {
  'docs-color': {
    primary: '#60a5fa',
    primaryHover: '#93c5fd',
    surface: '#0f172a',
    surfaceRaised: '#1e293b',
    text: '#f1f5f9',
    textMuted: '#94a3b8',
    border: '#334155',
    link: '#60a5fa',
    linkHover: '#93c5fd',
  },
});
