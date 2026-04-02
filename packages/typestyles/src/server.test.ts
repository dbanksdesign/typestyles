import { describe, it, expect, beforeEach } from 'vitest';
import { collectStyles } from './server.js';
import { resetClassNaming } from './class-naming.js';
import { createComponent } from './component.js';
import { createTokens } from './tokens.js';
import { reset } from './sheet.js';
import { registeredNamespaces } from './registry.js';

describe('collectStyles', () => {
  beforeEach(() => {
    reset();
    resetClassNaming();
    registeredNamespaces.clear();
  });

  it('collects CSS from styles created during render', () => {
    const { html, css } = collectStyles(() => {
      createComponent('ssr-btn', {
        base: { color: 'red' },
      });
      return '<button class="ssr-btn">Click</button>';
    });

    expect(html).toBe('<button class="ssr-btn">Click</button>');
    expect(css).toContain('.ssr-btn');
    expect(css).toContain('color: red');
  });

  it('collects CSS from tokens created during render', () => {
    const { css } = collectStyles(() => {
      createTokens('ssr-color', { primary: '#0066ff' });
      return '';
    });

    expect(css).toContain('--ssr-color-primary');
    expect(css).toContain('#0066ff');
  });

  it('collects both tokens and styles', () => {
    const { css } = collectStyles(() => {
      const color = createTokens('ssr-theme', { bg: '#fff' });
      createComponent('ssr-card', {
        base: { backgroundColor: color.bg },
      });
      return '';
    });

    expect(css).toContain('--ssr-theme-bg');
    expect(css).toContain('.ssr-card');
  });
});
