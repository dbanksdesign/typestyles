import type * as CSS from 'csstype';

/**
 * A CSS value that can be a standard value or a token reference (var() string).
 */
export type CSSValue = string | number;

/**
 * CSS properties with support for nested selectors and at-rules.
 * Extends csstype's Properties with nesting capabilities.
 */
export interface CSSProperties extends CSS.Properties<CSSValue> {
  /** Nested selector (e.g., '&:hover', '& .child', '&::before') */
  [selector: `&${string}`]: CSSProperties;
  /** At-rule (e.g., '@media (max-width: 768px)', '@container', '@supports') */
  [atRule: `@${string}`]: CSSProperties;
}

/**
 * A map of variant names to their CSS property definitions.
 */
export type StyleDefinitions = Record<string, CSSProperties>;

/**
 * A selector function returned by styles.create().
 * Accepts variant names (or falsy values for conditional application)
 * and returns a composed class name string.
 */
export interface SelectorFunction<K extends string = string> {
  (...variants: (K | false | null | undefined)[]): string;
}

/**
 * A flat map of token names to their values.
 */
export type TokenValues = Record<string, string>;

/**
 * A typed token reference object. Property access returns var(--namespace-key).
 */
export type TokenRef<T extends TokenValues> = {
  readonly [K in keyof T]: string;
};

/**
 * Theme overrides: a map of token namespaces to partial value overrides.
 */
export type ThemeOverrides = Record<string, Partial<TokenValues>>;

/**
 * Keyframe stops: 'from', 'to', or percentage strings mapped to CSS properties.
 */
export type KeyframeStops = Record<string, CSSProperties>;
