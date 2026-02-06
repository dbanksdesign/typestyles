import { createStyles } from './styles.js';
import { createTokens, useTokens, createTheme } from './tokens.js';
import { createKeyframes } from './keyframes.js';
import * as colorFns from './color.js';

export type {
  CSSProperties,
  CSSValue,
  StyleDefinitions,
  SelectorFunction,
  TokenValues,
  TokenRef,
  ThemeOverrides,
  KeyframeStops,
} from './types.js';

export type { ColorMixSpace } from './color.js';

/**
 * Style creation API.
 *
 * @example
 * ```ts
 * const button = styles.create('button', {
 *   base: { padding: '8px 16px' },
 *   primary: { backgroundColor: '#0066ff' },
 * });
 *
 * <button className={button('base', 'primary')}>
 * ```
 */
export const styles = {
  create: createStyles,
} as const;

/**
 * Design token API using CSS custom properties.
 *
 * @example
 * ```ts
 * const color = tokens.create('color', {
 *   primary: '#0066ff',
 * });
 *
 * color.primary // "var(--color-primary)"
 * ```
 */
export const tokens = {
  create: createTokens,
  use: useTokens,
  createTheme,
} as const;

/**
 * Keyframe animation API.
 *
 * @example
 * ```ts
 * const fadeIn = keyframes.create('fadeIn', {
 *   from: { opacity: 0 },
 *   to: { opacity: 1 },
 * });
 *
 * const card = styles.create('card', {
 *   base: { animation: `${fadeIn} 300ms ease` },
 * });
 * ```
 */
export const keyframes = {
  create: createKeyframes,
} as const;

/**
 * Type-safe CSS color function helpers.
 *
 * Each function returns a plain CSS color string — no runtime color math.
 * Composes naturally with token references.
 *
 * @example
 * ```ts
 * color.rgb(0, 102, 255)                    // "rgb(0 102 255)"
 * color.oklch(0.7, 0.15, 250)               // "oklch(0.7 0.15 250)"
 * color.mix(theme.primary, 'white', 20)      // "color-mix(in srgb, var(--theme-primary) 20%, white)"
 * color.alpha(theme.primary, 0.5)            // "color-mix(in srgb, var(--theme-primary) 50%, transparent)"
 * color.lightDark('#111', '#eee')            // "light-dark(#111, #eee)"
 * ```
 */
export const color = colorFns;
