import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { configureClassNaming, resetClassNaming } from './class-naming.js';
import { createClass, createHashClass } from './styles.js';
import { createComponent } from './component.js';
import { reset, flushSync } from './sheet.js';
import { registeredNamespaces } from './registry.js';

describe('class naming modes', () => {
  beforeEach(() => {
    reset();
    registeredNamespaces.clear();
    resetClassNaming();
  });

  afterEach(() => {
    resetClassNaming();
  });

  it('semantic mode: component base class = namespace', () => {
    configureClassNaming({ mode: 'semantic' });
    const btn = createComponent('btn', {
      base: { color: 'red' },
      primary: { backgroundColor: 'blue' },
    });
    expect(btn.base).toBe('btn');
    expect(btn.primary).toBe('btn-primary');
    expect(btn()).toBe('btn');
    expect(btn({ primary: true })).toBe('btn btn-primary');
  });

  it('semantic mode: dimensioned variant classes are namespace-dim-opt', () => {
    configureClassNaming({ mode: 'semantic' });
    const btn = createComponent('vbtn', {
      base: { color: 'red' },
      variants: { intent: { primary: { backgroundColor: 'blue' } } },
    });
    expect(btn.base).toBe('vbtn');
    expect(btn.primary).toBe('vbtn-intent-primary');
  });

  it('hashed mode yields stable prefixed class names', () => {
    configureClassNaming({ mode: 'hashed', prefix: 'app' });
    const a = createComponent('card', {
      root: { padding: '8px' },
    });
    const b = createComponent('card', {
      root: { padding: '8px' },
    });
    expect(a.root).toMatch(/^app-card-/);
    expect(a.root).toBe(b.root);
  });

  it('scopeId changes hashed output for the same logical component styles', () => {
    configureClassNaming({ mode: 'hashed', scopeId: 'pkg-a' });
    const x = createComponent('box', { main: { margin: 0 } }).main;
    reset();
    registeredNamespaces.clear();
    resetClassNaming();
    configureClassNaming({ mode: 'hashed', scopeId: 'pkg-b' });
    const y = createComponent('box', { main: { margin: 0 } }).main;
    expect(x).not.toBe(y);
  });

  it('atomic mode omits the namespace slug in class strings', () => {
    configureClassNaming({ mode: 'atomic', prefix: 'x' });
    const btn = createComponent('btn', {
      base: { color: 'red' },
    });
    expect(btn.base).toMatch(/^x-[a-z0-9]+$/);
    expect(btn.base).not.toContain('btn');
  });

  it('styles.class respects naming mode', () => {
    configureClassNaming({ mode: 'hashed', prefix: 't' });
    const cls = createClass('hero', { display: 'flex' });
    expect(cls).toMatch(/^t-hero-/);
  });

  it('createComponent (dimensioned) resolves variant keys to hashed classes', () => {
    configureClassNaming({ mode: 'hashed', prefix: 'c' });
    const btn = createComponent('cb', {
      base: { padding: '4px' },
      variants: {
        intent: {
          primary: { color: 'blue' },
        },
      },
    });
    const out = btn({ intent: 'primary' });
    expect(out).toMatch(/c-cb-/);
    expect(out).not.toContain('cb-intent-primary');
    flushSync();
    const style = document.getElementById('typestyles') as HTMLStyleElement;
    const parts = out.split(' ');
    for (const p of parts) {
      const found = Array.from(style.sheet?.cssRules ?? []).some(
        (r) => r instanceof CSSStyleRule && r.selectorText === `.${p}`,
      );
      expect(found, `selector .${p}`).toBe(true);
    }
  });

  it('createHashClass stays backward compatible when scopeId is empty', () => {
    configureClassNaming({ scopeId: '' });
    const cls = createHashClass({ color: 'red' }, 'lbl');
    expect(cls.startsWith('ts-lbl-')).toBe(true);
  });

  it('createHashClass includes scopeId in the hash when set', () => {
    const a = createHashClass({ width: 10 }, 'x');
    reset();
    registeredNamespaces.clear();
    resetClassNaming();
    configureClassNaming({ scopeId: 's1' });
    const b = createHashClass({ width: 10 }, 'x');
    expect(a).not.toBe(b);
  });
});
