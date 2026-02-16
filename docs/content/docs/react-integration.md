---
title: React Integration
description: Using typestyles with React patterns and best practices
---

# React Integration

TypeStyles works seamlessly with React. This guide shows common patterns for integrating typestyles into React applications.

## Basic component setup

### Simple button component

```tsx
// components/Button/Button.tsx
import { styles } from 'typestyles';
import { color, space } from '../../tokens';

const button = styles.create('button', {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${space.sm} ${space.md}`,
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    border: 'none',
    transition: 'background-color 150ms ease',
  },
  primary: {
    backgroundColor: color.primary,
    color: '#fff',
    '&:hover': {
      backgroundColor: color.primaryHover,
    },
  },
  secondary: {
    backgroundColor: color.secondary,
    color: '#fff',
    '&:hover': {
      backgroundColor: color.secondaryHover,
    },
  },
  small: {
    padding: `${space.xs} ${space.sm}`,
    fontSize: '12px',
  },
  large: {
    padding: `${space.md} ${space.lg}`,
    fontSize: '16px',
  },
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  loading: {
    cursor: 'wait',
  },
});

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  onClick,
  children,
}: ButtonProps) {
  return (
    <button
      className={button(
        'base',
        variant,
        size === 'small' && 'small',
        size === 'large' && 'large',
        disabled && 'disabled',
        loading && 'loading',
      )}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
}
```

### Using the button

```tsx
// App.tsx
import { Button } from './components/Button';

function App() {
  return (
    <div>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button size="large">Large</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
    </div>
  );
}
```

## Polymorphic components

### Creating a polymorphic Box component

```tsx
// components/Box/Box.tsx
import { styles } from 'typestyles';
import { space } from '../../tokens';
import type { ElementType, ComponentPropsWithoutRef } from 'react';

const box = styles.create('box', {
  base: {},
  flex: { display: 'flex' },
  block: { display: 'block' },
  inline: { display: 'inline' },
  hidden: { display: 'none' },
  gap1: { gap: space[1] },
  gap2: { gap: space[2] },
  gap3: { gap: space[3] },
  gap4: { gap: space[4] },
  row: { flexDirection: 'row' },
  column: { flexDirection: 'column' },
  wrap: { flexWrap: 'wrap' },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  p1: { padding: space[1] },
  p2: { padding: space[2] },
  p3: { padding: space[3] },
  p4: { padding: space[4] },
  m1: { margin: space[1] },
  m2: { margin: space[2] },
  m3: { margin: space[3] },
  m4: { margin: space[4] },
});

type BoxProps<T extends ElementType = 'div'> = {
  as?: T;
  display?: 'flex' | 'block' | 'inline' | 'hidden';
  gap?: 1 | 2 | 3 | 4;
  direction?: 'row' | 'column';
  wrap?: boolean;
  center?: boolean;
  padding?: 1 | 2 | 3 | 4;
  margin?: 1 | 2 | 3 | 4;
} & Omit<ComponentPropsWithoutRef<T>, 'as'>;

export function Box<T extends ElementType = 'div'>({
  as,
  display,
  gap,
  direction,
  wrap,
  center,
  padding,
  margin,
  className,
  ...props
}: BoxProps<T>) {
  const Component = as || 'div';

  return (
    <Component
      className={box(
        'base',
        display,
        gap && `gap${gap}`,
        direction,
        wrap && 'wrap',
        center && 'center',
        padding && `p${padding}`,
        margin && `m${margin}`,
        className,
      )}
      {...props}
    />
  );
}
```

### Using Box as different elements

```tsx
// Using as a div (default)
<Box display="flex" gap={2} padding={3}>
  Content
</Box>

// Using as a button
<Box as="button" display="flex" center padding={2}>
  Click me
</Box>

// Using as a link
<Box as="a" href="/about" display="inline" padding={1}>
  About
</Box>

// Using with custom component
<Box as={CustomComponent} display="block" padding={4}>
  Content
</Box>
```

## Compound components

### Card component with multiple parts

```tsx
// components/Card/Card.tsx
import { styles } from 'typestyles';
import { color, space } from '../../tokens';
import { createContext, useContext, type ReactNode } from 'react';

const card = styles.create('card', {
  base: {
    borderRadius: '8px',
    backgroundColor: color.surface,
    border: `1px solid ${color.border}`,
    overflow: 'hidden',
  },
  elevated: {
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  interactive: {
    cursor: 'pointer',
    transition: 'box-shadow 200ms ease',
    '&:hover': {
      boxShadow: '0 8px 12px rgba(0, 0, 0, 0.15)',
    },
  },
});

const cardHeader = styles.create('card-header', {
  base: {
    padding: `${space.md} ${space.lg}`,
    borderBottom: `1px solid ${color.border}`,
  },
});

const cardBody = styles.create('card-body', {
  base: {
    padding: space.lg,
  },
});

const cardFooter = styles.create('card-footer', {
  base: {
    padding: `${space.md} ${space.lg}`,
    borderTop: `1px solid ${color.border}`,
    backgroundColor: color.surfaceRaised,
  },
});

// Context for sharing state between compound components
interface CardContextValue {
  isInteractive: boolean;
}

const CardContext = createContext<CardContextValue>({ isInteractive: false });

// Main Card component
interface CardProps {
  elevated?: boolean;
  interactive?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

export function Card({ elevated = false, interactive = false, onClick, children }: CardProps) {
  return (
    <CardContext.Provider value={{ isInteractive: interactive }}>
      <div
        className={card('base', elevated && 'elevated', interactive && 'interactive')}
        onClick={onClick}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
      >
        {children}
      </div>
    </CardContext.Provider>
  );
}

// Card.Header
Card.Header = function CardHeader({ children }: { children: ReactNode }) {
  return <div className={cardHeader('base')}>{children}</div>;
};

// Card.Body
Card.Body = function CardBody({ children }: { children: ReactNode }) {
  return <div className={cardBody('base')}>{children}</div>;
};

// Card.Footer
Card.Footer = function CardFooter({ children }: { children: ReactNode }) {
  return <div className={cardFooter('base')}>{children}</div>;
};
```

### Using compound components

```tsx
import { Card } from './components/Card';

function Example() {
  return (
    <Card elevated interactive onClick={() => console.log('Clicked!')}>
      <Card.Header>
        <h3>Card Title</h3>
      </Card.Header>
      <Card.Body>
        <p>Card content goes here...</p>
      </Card.Body>
      <Card.Footer>
        <button>Action</button>
      </Card.Footer>
    </Card>
  );
}
```

## Form components

### Input with validation states

```tsx
// components/Input/Input.tsx
import { styles } from 'typestyles';
import { color, space } from '../../tokens';
import { forwardRef } from 'react';

const input = styles.create('input', {
  base: {
    width: '100%',
    padding: `${space.sm} ${space.md}`,
    borderRadius: '6px',
    border: `1px solid ${color.border}`,
    fontSize: '14px',
    lineHeight: '1.5',
    backgroundColor: color.surface,
    color: color.text,
    transition: 'border-color 150ms ease, box-shadow 150ms ease',

    '&:focus': {
      outline: 'none',
      borderColor: color.primary,
      boxShadow: `0 0 0 3px ${color.alpha(color.primary, 0.1)}`,
    },

    '&::placeholder': {
      color: color.textMuted,
    },

    '&:disabled': {
      backgroundColor: color.surfaceSunken,
      cursor: 'not-allowed',
    },
  },
  error: {
    borderColor: color.danger,

    '&:focus': {
      borderColor: color.danger,
      boxShadow: `0 0 0 3px ${color.alpha(color.danger, 0.1)}`,
    },
  },
  success: {
    borderColor: color.success,

    '&:focus': {
      borderColor: color.success,
      boxShadow: `0 0 0 3px ${color.alpha(color.success, 0.1)}`,
    },
  },
});

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  success?: boolean;
  label?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, success, label, helperText, className, ...props }, ref) => {
    return (
      <div className={inputWrapper('base')}>
        {label && <label className={inputLabel('base')}>{label}</label>}
        <input
          ref={ref}
          className={input('base', error && 'error', success && 'success', className)}
          {...props}
        />
        {helperText && (
          <span className={inputHelper('base', error && 'error', success && 'success')}>
            {helperText}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

// Additional styles for the wrapper, label, and helper
const inputWrapper = styles.create('input-wrapper', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: space.sm,
  },
});

const inputLabel = styles.create('input-label', {
  base: {
    fontSize: '14px',
    fontWeight: 500,
    color: color.text,
  },
});

const inputHelper = styles.create('input-helper', {
  base: {
    fontSize: '12px',
    color: color.textMuted,
  },
  error: {
    color: color.danger,
  },
  success: {
    color: color.success,
  },
});
```

## Lists and grids

### Responsive grid component

```tsx
// components/Grid/Grid.tsx
import { styles } from 'typestyles';
import { space } from '../../tokens';
import type { ReactNode } from 'react';

const grid = styles.create('grid', {
  base: {
    display: 'grid',
    gap: space.md,
  },
  cols1: { gridTemplateColumns: 'repeat(1, 1fr)' },
  cols2: { gridTemplateColumns: 'repeat(2, 1fr)' },
  cols3: { gridTemplateColumns: 'repeat(3, 1fr)' },
  cols4: { gridTemplateColumns: 'repeat(4, 1fr)' },
  cols6: { gridTemplateColumns: 'repeat(6, 1fr)' },
  cols12: { gridTemplateColumns: 'repeat(12, 1fr)' },

  // Responsive columns
  '@media (min-width: 640px)': {
    smCols1: { gridTemplateColumns: 'repeat(1, 1fr)' },
    smCols2: { gridTemplateColumns: 'repeat(2, 1fr)' },
    smCols3: { gridTemplateColumns: 'repeat(3, 1fr)' },
  },
  '@media (min-width: 768px)': {
    mdCols1: { gridTemplateColumns: 'repeat(1, 1fr)' },
    mdCols2: { gridTemplateColumns: 'repeat(2, 1fr)' },
    mdCols3: { gridTemplateColumns: 'repeat(3, 1fr)' },
    mdCols4: { gridTemplateColumns: 'repeat(4, 1fr)' },
  },
  '@media (min-width: 1024px)': {
    lgCols1: { gridTemplateColumns: 'repeat(1, 1fr)' },
    lgCols2: { gridTemplateColumns: 'repeat(2, 1fr)' },
    lgCols3: { gridTemplateColumns: 'repeat(3, 1fr)' },
    lgCols4: { gridTemplateColumns: 'repeat(4, 1fr)' },
    lgCols6: { gridTemplateColumns: 'repeat(6, 1fr)' },
  },
});

interface GridProps {
  columns?: 1 | 2 | 3 | 4 | 6 | 12;
  smColumns?: 1 | 2 | 3 | 4;
  mdColumns?: 1 | 2 | 3 | 4;
  lgColumns?: 1 | 2 | 3 | 4 | 6;
  gap?: 'none' | 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function Grid({
  columns = 1,
  smColumns,
  mdColumns,
  lgColumns,
  gap = 'md',
  children,
}: GridProps) {
  return (
    <div
      className={grid(
        'base',
        `cols${columns}`,
        smColumns && `smCols${smColumns}`,
        mdColumns && `mdCols${mdColumns}`,
        lgColumns && `lgCols${lgColumns}`,
      )}
      style={{ gap: gap === 'none' ? 0 : undefined }}
    >
      {children}
    </div>
  );
}
```

## Context and theming

### Theme provider

```tsx
// components/ThemeProvider/ThemeProvider.tsx
import { createContext, useContext, useState, type ReactNode } from 'react';
import { darkTheme } from '../../tokens';

interface ThemeContextValue {
  isDark: boolean;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  isDark: false,
  toggle: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    return document.documentElement.classList.contains('theme-dark');
  });

  const toggle = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('theme-dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('theme-dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      <div className={isDark ? darkTheme : ''}>{children}</div>
    </ThemeContext.Provider>
  );
}
```

### Using the theme

```tsx
// components/ThemeToggle/ThemeToggle.tsx
import { useTheme } from '../ThemeProvider';
import { Button } from '../Button';

export function ThemeToggle() {
  const { isDark, toggle } = useTheme();

  return (
    <Button variant="secondary" onClick={toggle}>
      {isDark ? '🌞 Light mode' : '🌙 Dark mode'}
    </Button>
  );
}
```

## Performance optimization

### Memoized class names

For components that re-render frequently, you can memoize class name generation:

```tsx
import { useMemo } from 'react';
import { button } from './button.styles';

function OptimizedButton({ variant, size, disabled }) {
  const className = useMemo(
    () => button('base', variant, size, disabled && 'disabled'),
    [variant, size, disabled],
  );

  return <button className={className}>Click</button>;
}
```

However, this is usually unnecessary since the selector function is already very fast.

### Code splitting

```tsx
// Lazy load heavy components with their styles
const HeavyChart = lazy(() => import('./components/HeavyChart'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyChart />
    </Suspense>
  );
}
```

The styles in `HeavyChart` are only loaded when the component is imported.

## TypeScript best practices

### Export component prop types

```tsx
// components/Button/Button.tsx
export interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  // ...
}

export function Button(props: ButtonProps) {
  // ...
}
```

### Use strict prop types

```tsx
// Good - strict typing
type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps {
  variant?: ButtonVariant;
}

// Avoid - too permissive
interface ButtonProps {
  variant?: string; // Too broad
}
```

## Summary

Key patterns for React + typestyles:

1. **Define styles at module level** - Never in components
2. **Use TypeScript for prop types** - Get autocomplete and error checking
3. **Compose variants** - Build flexible component APIs
4. **Consider polymorphism** - `as` prop for versatile components
5. **Leverage context** - Share state between compound components
6. **Memoize if needed** - But profile first, selector functions are fast
7. **Code split naturally** - Styles follow component boundaries
