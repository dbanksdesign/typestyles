import { tokens } from 'typestyles';

export const color = tokens.create('color', {
  primary: '#0066ff',
  primaryHover: '#0052cc',
  secondary: '#6b7280',
  secondaryHover: '#4b5563',
  surface: '#ffffff',
  surfaceRaised: '#f9fafb',
  text: '#111827',
  textMuted: '#6b7280',
  border: '#e5e7eb',
  success: '#10b981',
  danger: '#ef4444',
});

export const space = tokens.create('space', {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
});

export const darkTheme = tokens.createTheme('dark', {
  color: {
    primary: '#66b3ff',
    primaryHover: '#3399ff',
    secondary: '#9ca3af',
    secondaryHover: '#d1d5db',
    surface: '#1a1a2e',
    surfaceRaised: '#25253e',
    text: '#e0e0e0',
    textMuted: '#9ca3af',
    border: '#3f3f5c',
  },
});
