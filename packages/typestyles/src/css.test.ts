import { describe, it, expect } from 'vitest';
import { toKebabCase, serializeStyle } from './css.js';

describe('toKebabCase', () => {
  it('converts camelCase to kebab-case', () => {
    expect(toKebabCase('fontSize')).toBe('font-size');
    expect(toKebabCase('backgroundColor')).toBe('background-color');
    expect(toKebabCase('borderTopLeftRadius')).toBe('border-top-left-radius');
  });

  it('handles ms vendor prefix', () => {
    expect(toKebabCase('msTransform')).toBe('-ms-transform');
    expect(toKebabCase('msFlexAlign')).toBe('-ms-flex-align');
  });

  it('passes through already-kebab properties', () => {
    expect(toKebabCase('color')).toBe('color');
    expect(toKebabCase('display')).toBe('display');
  });
});

describe('serializeStyle', () => {
  it('serializes basic CSS properties', () => {
    const rules = serializeStyle('.button-base', {
      color: 'red',
      fontSize: '14px',
    });

    expect(rules).toHaveLength(1);
    expect(rules[0].css).toBe('.button-base { color: red; font-size: 14px; }');
  });

  it('converts numeric values to px', () => {
    const rules = serializeStyle('.box', {
      width: 100,
      height: 50,
      padding: 16,
    });

    expect(rules[0].css).toBe('.box { width: 100px; height: 50px; padding: 16px; }');
  });

  it('keeps unitless properties as numbers', () => {
    const rules = serializeStyle('.text', {
      fontWeight: 700,
      lineHeight: 1.5,
      opacity: 0.8,
      zIndex: 10,
    });

    expect(rules[0].css).toBe(
      '.text { font-weight: 700; line-height: 1.5; opacity: 0.8; z-index: 10; }'
    );
  });

  it('handles zero values without px', () => {
    const rules = serializeStyle('.box', { margin: 0, padding: 0 });
    expect(rules[0].css).toBe('.box { margin: 0; padding: 0; }');
  });

  it('serializes nested selectors', () => {
    const rules = serializeStyle('.button', {
      color: 'blue',
      '&:hover': { color: 'red' },
      '&:disabled': { opacity: 0.5 },
    });

    expect(rules).toHaveLength(3);
    expect(rules[0].css).toBe('.button { color: blue; }');
    expect(rules[1].css).toBe('.button:hover { color: red; }');
    expect(rules[2].css).toBe('.button:disabled { opacity: 0.5; }');
  });

  it('serializes descendant selectors', () => {
    const rules = serializeStyle('.nav', {
      '& a': { textDecoration: 'none' },
      '& > li': { listStyle: 'none' },
    });

    expect(rules[0].css).toBe('.nav a { text-decoration: none; }');
    expect(rules[1].css).toBe('.nav > li { list-style: none; }');
  });

  it('serializes media queries', () => {
    const rules = serializeStyle('.card', {
      display: 'flex',
      '@media (max-width: 768px)': {
        display: 'block',
      },
    });

    expect(rules).toHaveLength(2);
    expect(rules[0].css).toBe('.card { display: flex; }');
    expect(rules[1].css).toBe(
      '@media (max-width: 768px) { .card { display: block; } }'
    );
  });

  it('serializes container queries', () => {
    const rules = serializeStyle('.widget', {
      '@container (min-width: 400px)': {
        gridTemplateColumns: '1fr 1fr',
      },
    });

    expect(rules[0].css).toBe(
      '@container (min-width: 400px) { .widget { grid-template-columns: 1fr 1fr; } }'
    );
  });

  it('skips null/undefined values', () => {
    const rules = serializeStyle('.box', {
      color: 'red',
      background: undefined as unknown as string,
      border: null as unknown as string,
    });

    expect(rules[0].css).toBe('.box { color: red; }');
  });

  it('returns empty array for all-null properties', () => {
    const rules = serializeStyle('.empty', {});
    expect(rules).toHaveLength(0);
  });
});
