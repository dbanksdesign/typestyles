import { describe, it, expect } from 'vitest';
import { extractNamespaces } from './index.js';

describe('extractNamespaces', () => {
  it('extracts styles.create namespaces as prefixes', () => {
    const code = `
      import { styles } from 'typestyles';
      const button = styles.create('button', {
        base: { color: 'red' },
      });
    `;
    const result = extractNamespaces(code);
    expect(result.prefixes).toEqual(['.button-']);
    expect(result.keys).toEqual([]);
  });

  it('extracts tokens.create namespaces as keys', () => {
    const code = `
      import { tokens } from 'typestyles';
      const color = tokens.create('color', { primary: '#0066ff' });
    `;
    const result = extractNamespaces(code);
    expect(result.keys).toEqual(['tokens:color']);
    expect(result.prefixes).toEqual([]);
  });

  it('extracts createTheme as theme keys', () => {
    const code = `
      import { tokens } from 'typestyles';
      const dark = tokens.createTheme('dark', { color: { primary: '#fff' } });
    `;
    const result = extractNamespaces(code);
    expect(result.keys).toEqual(['theme:dark']);
  });

  it('extracts standalone createTheme calls', () => {
    const code = `
      import { createTheme } from 'typestyles';
      const dark = createTheme('dark', { color: { primary: '#fff' } });
    `;
    const result = extractNamespaces(code);
    expect(result.keys).toEqual(['theme:dark']);
  });

  it('extracts keyframes.create as keyframe keys', () => {
    const code = `
      import { keyframes } from 'typestyles';
      const fadeIn = keyframes.create('fadeIn', {
        from: { opacity: 0 },
        to: { opacity: 1 },
      });
    `;
    const result = extractNamespaces(code);
    expect(result.keys).toEqual(['keyframes:fadeIn']);
    expect(result.prefixes).toEqual([]);
  });

  it('extracts multiple namespaces from a single module', () => {
    const code = `
      import { styles, tokens, keyframes } from 'typestyles';
      const color = tokens.create('color', { primary: '#0066ff' });
      const fadeIn = keyframes.create('fadeIn', { from: { opacity: 0 }, to: { opacity: 1 } });
      const button = styles.create('button', { base: { color: color.primary } });
      const card = styles.create('card', { base: { animation: fadeIn } });
    `;
    const result = extractNamespaces(code);
    expect(result.keys).toEqual(['tokens:color', 'keyframes:fadeIn']);
    expect(result.prefixes).toEqual(['.button-', '.card-']);
  });

  it('handles double-quoted strings', () => {
    const code = `
      const button = styles.create("button", { base: { color: 'red' } });
    `;
    const result = extractNamespaces(code);
    expect(result.prefixes).toEqual(['.button-']);
  });

  it('returns empty arrays for code with no typestyles calls', () => {
    const code = `
      const x = 1 + 2;
      console.log(x);
    `;
    const result = extractNamespaces(code);
    expect(result.keys).toEqual([]);
    expect(result.prefixes).toEqual([]);
  });
});

describe('typestyles vite plugin', () => {
  it('exports a default function', async () => {
    const mod = await import('./index.js');
    expect(typeof mod.default).toBe('function');
  });

  it('returns a plugin object with correct name', async () => {
    const mod = await import('./index.js');
    const plugin = mod.default();
    expect(plugin.name).toBe('typestyles');
  });
});
