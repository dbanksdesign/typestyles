---
title: Theming Patterns
description: Light/dark mode, multi-brand theming, and advanced theme strategies
---

# Theming Patterns

TypeStyles uses CSS custom properties for theming, making it flexible and powerful. This guide covers common theming patterns.

## Basic light/dark mode

### Creating a theme

```ts
// tokens.ts
import { tokens } from 'typestyles';

// Define your base tokens
export const color = tokens.create('color', {
  // Light mode defaults
  text: '#111827',
  textMuted: '#6b7280',
  surface: '#ffffff',
  surfaceRaised: '#f9fafb',
  surfaceSunken: '#f3f4f6',
  border: '#e5e7eb',
  primary: '#0066ff',
  primaryHover: '#0052cc',
});

// Create dark theme override
export const darkTheme = tokens.createTheme('dark', {
  color: {
    text: '#e0e0e0',
    textMuted: '#9ca3af',
    surface: '#1a1a2e',
    surfaceRaised: '#25253e',
    surfaceSunken: '#16162a',
    border: '#3f3f5c',
    primary: '#66b3ff',
    primaryHover: '#3399ff',
  },
});
```

### Applying the theme

```tsx
// App.tsx
import { darkTheme } from './tokens';

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className={isDark ? darkTheme : ''}>
      <button onClick={() => setIsDark(!isDark)}>Toggle theme</button>
      <PageContent />
    </div>
  );
}
```

### Persisting theme preference

```tsx
// hooks/useTheme.ts
import { useState, useEffect } from 'react';
import { darkTheme } from '../tokens';

export function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage first
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored) return stored === 'dark';

      // Fall back to system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    // Optional: Update meta theme-color
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', isDark ? '#1a1a2e' : '#ffffff');
    }
  }, [isDark]);

  return { isDark, theme: isDark ? darkTheme : '', toggle: () => setIsDark(!isDark) };
}
```

## System preference detection

### CSS-only approach (no flash)

```ts
// tokens.ts
export const color = tokens.create('color', {
  text: '#111827',
  surface: '#ffffff',
  // ... other tokens
});

export const darkTheme = tokens.createTheme('dark', {
  color: {
    text: '#e0e0e0',
    surface: '#1a1a2e',
  },
});
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
    <script>
      // Prevent flash of wrong theme
      (function () {
        const theme =
          localStorage.getItem('theme') ||
          (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        if (theme === 'dark') {
          document.documentElement.classList.add('theme-dark');
        }
      })();
    </script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

```tsx
// App.tsx
import { darkTheme } from './tokens';

function App() {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains('theme-dark'),
  );

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add('theme-dark');
    } else {
      document.documentElement.classList.remove('theme-dark');
    }
  };

  return <div className={isDark ? darkTheme : ''}>{/* app content */}</div>;
}
```

## Multi-brand theming

### Different themes for different contexts

```ts
// themes.ts
import { tokens } from 'typestyles';

// Define base tokens structure
const baseTokens = {
  color: {
    primary: '',
    secondary: '',
    text: '',
    surface: '',
  },
  space: {
    sm: '8px',
    md: '16px',
    lg: '24px',
  },
};

// Brand A theme
export const brandA = tokens.createTheme('brand-a', {
  color: {
    primary: '#0066ff',
    secondary: '#6b7280',
    text: '#111827',
    surface: '#ffffff',
  },
});

// Brand B theme
export const brandB = tokens.createTheme('brand-b', {
  color: {
    primary: '#10b981',
    secondary: '#f59e0b',
    text: '#1f2937',
    surface: '#fafafa',
  },
});

// Brand C theme
export const brandC = tokens.createTheme('brand-c', {
  color: {
    primary: '#ef4444',
    secondary: '#8b5cf6',
    text: '#0f172a',
    surface: '#f8fafc',
  },
});
```

### Applying brand themes

```tsx
// App.tsx
import { brandA, brandB, brandC } from './themes';

const brands = {
  a: brandA,
  b: brandB,
  c: brandC,
};

function App({ brandId }) {
  const themeClass = brands[brandId] || brandA;

  return (
    <div className={themeClass}>
      <PageContent />
    </div>
  );
}
```

### Nested themes

Themes can be nested for scoped theming:

```tsx
import { brandA, brandB } from './themes';

function App() {
  return (
    <div className={brandA}>
      <Header /> {/* Uses brandA colors */}
      <main>
        <div className={brandB}>
          <Widget /> {/* Uses brandB colors */}
        </div>
      </main>
      <Footer /> {/* Uses brandA colors */}
    </div>
  );
}
```

CSS custom properties cascade naturally, so the inner theme overrides only affect its subtree.

## Component-specific themes

### Isolated component theming

```ts
// components/Chart/Chart.tokens.ts
import { tokens } from 'typestyles';

// Chart-specific tokens that don't affect the rest of the app
export const chartTheme = tokens.createTheme('chart', {
  color: {
    primary: '#0066ff',
    secondary: '#10b981',
    tertiary: '#f59e0b',
    quaternary: '#ef4444',
    grid: '#e5e7eb',
    axis: '#6b7280',
  },
});
```

```tsx
// components/Chart/Chart.tsx
import { chartTheme } from './Chart.tokens';

export function Chart({ data }) {
  return (
    <div className={chartTheme}>
      <svg className={chart('svg')}>{/* Chart uses chart-specific color tokens */}</svg>
    </div>
  );
}
```

## Seasonal/time-based themes

### Time-aware theming

```ts
// themes/seasonal.ts
import { tokens } from 'typestyles';

export const holidayTheme = tokens.createTheme('holiday', {
  color: {
    primary: '#c41e3a', // Holiday red
    secondary: '#165b33', // Holiday green
    accent: '#ffd700', // Gold
  },
});

export const springTheme = tokens.createTheme('spring', {
  color: {
    primary: '#88c999',
    secondary: '#f4a460',
    accent: '#ffb6c1',
  },
});
```

```tsx
// hooks/useSeasonalTheme.ts
import { holidayTheme, springTheme } from '../themes/seasonal';

export function useSeasonalTheme() {
  const now = new Date();
  const month = now.getMonth();
  const day = now.getDate();

  // Holiday season: December
  if (month === 11) {
    return holidayTheme;
  }

  // Spring: March-May
  if (month >= 2 && month <= 4) {
    return springTheme;
  }

  return null; // Use default theme
}
```

## Advanced theme composition

### Partial themes

```ts
// themes/semantics.ts
import { tokens } from 'typestyles';

// Semantic color tokens
export const successTheme = tokens.createTheme('success', {
  color: {
    primary: '#10b981',
    primaryHover: '#059669',
  },
});

export const warningTheme = tokens.createTheme('warning', {
  color: {
    primary: '#f59e0b',
    primaryHover: '#d97706',
  },
});

export const dangerTheme = tokens.createTheme('danger', {
  color: {
    primary: '#ef4444',
    primaryHover: '#dc2626',
  },
});
```

```tsx
// components/Alert/Alert.tsx
import { successTheme, warningTheme, dangerTheme } from '../../themes/semantics';

const alertThemes = {
  success: successTheme,
  warning: warningTheme,
  danger: dangerTheme,
};

export function Alert({ type, children }) {
  return <div className={alertThemes[type]}>{children}</div>;
}
```

### Token layering

```ts
// tokens/layers.ts
import { tokens } from 'typestyles';

// Layer 1: Primitives
const primitives = tokens.create('primitives', {
  // Raw values
  blue500: '#0066ff',
  blue600: '#0052cc',
  gray500: '#6b7280',
});

// Layer 2: Semantic tokens
const color = tokens.create('color', {
  // Reference primitives
  primary: primitives.blue500,
  primaryHover: primitives.blue600,
  text: '#111827',
});

// Layer 3: Component tokens
const button = tokens.create('button', {
  // Reference semantic tokens
  backgroundColor: color.primary,
  backgroundColorHover: color.primaryHover,
  textColor: '#ffffff',
});
```

## Accessibility considerations

### High contrast mode

```ts
// themes/accessibility.ts
import { tokens } from 'typestyles';

export const highContrastTheme = tokens.createTheme('high-contrast', {
  color: {
    text: '#000000',
    surface: '#ffffff',
    primary: '#0000ff',
    border: '#000000',
  },
});
```

```tsx
// hooks/useAccessibility.ts
export function useHighContrast() {
  const [isHighContrast, setIsHighContrast] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    setIsHighContrast(mediaQuery.matches);

    const handler = (e) => setIsHighContrast(e.matches);
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return isHighContrast;
}
```

### Respect user preferences

```ts
// tokens.ts
import { tokens } from 'typestyles';

export const color = tokens.create('color', {
  text: '#111827',
  // ... other tokens
});

export const darkTheme = tokens.createTheme('dark', {
  color: {
    text: '#e0e0e0',
    // ... other overrides
  },
});

export const reducedMotionTheme = tokens.createTheme('reduced-motion', {
  // You could add motion-related tokens here
});
```

```tsx
// App.tsx
import { darkTheme } from './tokens';

function App() {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  const themeClasses = [prefersDark && darkTheme, prefersReducedMotion && 'reduce-motion']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={themeClasses}>
      <PageContent />
    </div>
  );
}
```

## Theme switching transitions

### Smooth theme transitions

```css
/* Add to your global CSS or a style element */
html,
body,
* {
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    border-color 0.3s ease;
}
```

Or with typestyles:

```ts
const global = styles.create('global', {
  root: {
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
});

// Apply to root element
<div className={global('root')}>
  {/* app content */}
</div>
```

### Prevent flash during theme switch

```tsx
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Read theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    setTheme(savedTheme === 'dark' ? darkTheme : '');
    setIsReady(true);
  }, []);

  // Prevent rendering until theme is determined
  if (!isReady) {
    return null; // or a loading spinner
  }

  return <div className={theme}>{children}</div>;
}
```

## SSR with themes

### Server-side theme detection

```ts
// server.ts
import { collectStyles } from 'typestyles/server';
import { darkTheme } from './tokens';

app.get('/', (req, res) => {
  // Detect theme from cookie or user preference
  const themeCookie = req.cookies.theme;
  const isDark = themeCookie === 'dark';

  const { html, css } = collectStyles(() =>
    renderToString(
      <div className={isDark ? darkTheme : ''}>
        <App />
      </div>
    )
  );

  res.send(`
    <!DOCTYPE html>
    <html class="${isDark ? darkTheme : ''}">
      <head>
        <style id="typestyles">${css}</style>
      </head>
      <body>
        <div id="root">${html}</div>
      </body>
    </html>
  `);
});
```

## Best practices

1. **Use semantic token names** - `primary`, `surface`, `text` instead of `blue`, `white`, `black`
2. **Define dark mode alongside light mode** - Keep them in sync
3. **Test both themes** - Use visual regression for both modes
4. **Respect system preferences** - Default to `prefers-color-scheme`
5. **Provide user override** - Let users choose independently of system
6. **Store preference** - Use localStorage to remember user choice
7. **Avoid theme flash** - Set theme class before first paint
8. **Use CSS custom properties** - They cascade naturally for nested themes
