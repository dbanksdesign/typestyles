/**
 * Atomic utility classes using @typestyles/props
 * Dogfooding the new atomic CSS utilities throughout the docs site
 */
import { defineProperties, createProps } from '@typestyles/props';

// Define comprehensive atomic utilities for the docs site
const layout = defineProperties({
  conditions: {
    mobile: { '@media': '(max-width: 768px)' },
  },
  properties: {
    display: ['none', 'block', 'flex', 'inline-flex', 'grid'],
    flexDirection: ['row', 'column'],
    alignItems: ['start', 'center', 'end', 'stretch', 'baseline'],
    justifyContent: ['start', 'center', 'end', 'space-between', 'space-around'],
    flexShrink: { 0: '0', 1: '1' },
    flex: { 1: '1', none: 'none' },
    position: ['relative', 'absolute', 'fixed', 'sticky'],
    overflow: ['auto', 'hidden', 'visible', 'scroll'],
    overflowY: ['auto', 'hidden', 'visible', 'scroll'],
  },
});

const spacing = defineProperties({
  conditions: {
    mobile: { '@media': '(max-width: 768px)' },
  },
  properties: {
    gap: {
      0: '0',
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
    },
    padding: {
      0: '0',
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
      xxl: '48px',
    },
    paddingTop: {
      0: '0',
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
      xxl: '48px',
    },
    paddingBottom: {
      0: '0',
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
      xxl: '48px',
    },
    paddingLeft: {
      0: '0',
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
      xxl: '48px',
    },
    paddingRight: {
      0: '0',
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
      xxl: '48px',
    },
    margin: {
      0: '0',
      auto: 'auto',
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
    },
    marginBottom: {
      0: '0',
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
    },
    marginTop: {
      0: '0',
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
    },
  },
  shorthands: {
    p: ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'],
    px: ['paddingLeft', 'paddingRight'],
    py: ['paddingTop', 'paddingBottom'],
    m: ['margin'],
  },
});

const sizing = defineProperties({
  properties: {
    width: {
      full: '100%',
      auto: 'auto',
      fit: 'fit-content',
    },
    height: {
      full: '100%',
      screen: '100vh',
      auto: 'auto',
    },
    minWidth: {
      0: '0',
      full: '100%',
    },
    maxWidth: {
      none: 'none',
      xs: '320px',
      sm: '384px',
      md: '448px',
      lg: '512px',
      xl: '576px',
      '2xl': '672px',
      '3xl': '768px',
      '4xl': '896px',
      '5xl': '1024px',
      '6xl': '1152px',
      full: '100%',
    },
    minHeight: {
      0: '0',
      screen: '100vh',
    },
  },
});

// Create atomic utility props function
export const atoms = createProps('atom', layout, spacing, sizing);
