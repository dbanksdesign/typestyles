import { tokens } from 'typestyles';

export const color = tokens.create('docs-color', {
  primary: '#10b981',
  primaryHover: '#059669',
  primarySubtle: '#ecfdf5',
  surface: '#ffffff',
  surfaceRaised: '#f8fafc',
  sidebarBg: '#f9fafb',
  sidebarBorder: '#e5e7eb',
  text: '#111827',
  textMuted: '#6b7280',
  textFaint: '#9ca3af',
  border: '#e5e7eb',
  link: '#10b981',
  linkHover: '#059669',
  searchBg: '#f3f4f6',
  searchBorder: '#d1d5db',
  searchText: '#374151',
  codeBg: '#f1f5f9',
  codeBorder: '#e2e8f0',
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
  sans: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  mono: '"Fira Code", ui-monospace, "Cascadia Code", monospace',
});

export const darkTheme = tokens.createTheme('docs-dark', {
  'docs-color': {
    primary: '#34d399',
    primaryHover: '#6ee7b7',
    primarySubtle: '#064e3b',
    surface: '#111111',
    surfaceRaised: '#1a1a1a',
    sidebarBg: '#0a0a0a',
    sidebarBorder: '#262626',
    text: '#e5e7eb',
    textMuted: '#9ca3af',
    textFaint: '#6b7280',
    border: '#262626',
    link: '#34d399',
    linkHover: '#6ee7b7',
    searchBg: '#1a1a1a',
    searchBorder: '#333333',
    searchText: '#d1d5db',
    codeBg: '#1e1e1e',
    codeBorder: '#333333',
  },
});
