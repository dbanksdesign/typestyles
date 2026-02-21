import type { CSSProperties } from './types.js';

/**
 * Convert a camelCase CSS property name to kebab-case.
 * Handles vendor prefixes (ms, webkit, moz) correctly.
 */
export function toKebabCase(prop: string): string {
  // Handle ms- prefix specially (no leading dash in camelCase)
  if (prop.startsWith('ms')) {
    return '-' + prop.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());
  }
  return prop.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());
}

/**
 * Serialize a single CSS value. Numbers are treated as px for most properties.
 */
function serializeValue(prop: string, value: string | number): string {
  if (typeof value === 'number') {
    if (value === 0) return '0';
    // Unitless properties that shouldn't get 'px'
    if (unitlessProperties.has(prop)) return String(value);
    return value + 'px';
  }
  return value;
}

const unitlessProperties = new Set([
  'animationIterationCount',
  'borderImageOutset',
  'borderImageSlice',
  'borderImageWidth',
  'columnCount',
  'columns',
  'flex',
  'flexGrow',
  'flexPositive',
  'flexShrink',
  'flexNegative',
  'flexOrder',
  'fontWeight',
  'gridArea',
  'gridColumn',
  'gridColumnEnd',
  'gridColumnSpan',
  'gridColumnStart',
  'gridRow',
  'gridRowEnd',
  'gridRowSpan',
  'gridRowStart',
  'lineClamp',
  'lineHeight',
  'opacity',
  'order',
  'orphans',
  'tabSize',
  'widows',
  'zIndex',
  'zoom',
  'fillOpacity',
  'floodOpacity',
  'stopOpacity',
  'strokeDasharray',
  'strokeDashoffset',
  'strokeMiterlimit',
  'strokeOpacity',
  'strokeWidth',
]);

/**
 * Represents a generated CSS rule.
 */
export interface CSSRule {
  /** Unique key for deduplication */
  key: string;
  /** The CSS rule string */
  css: string;
}

/**
 * Serialize a style definition object into CSS rule(s) for a given selector.
 */
export function serializeStyle(selector: string, properties: CSSProperties): CSSRule[] {
  const rules: CSSRule[] = [];
  const declarations: string[] = [];

  for (const [prop, value] of Object.entries(properties)) {
    if (value == null) continue;

    if (prop.startsWith('&')) {
      // Nested selector: replace & with the parent selector
      const nestedSelector = prop.replace(/&/g, selector);
      rules.push(...serializeStyle(nestedSelector, value as CSSProperties));
    } else if (prop.startsWith('[')) {
      // Attribute selector: combine with parent selector
      const attrSelector = selector + prop;
      rules.push(...serializeStyle(attrSelector, value as CSSProperties));
    } else if (prop.startsWith('@')) {
      // At-rule: wrap the serialized content in the at-rule
      const innerRules = serializeStyle(selector, value as CSSProperties);
      for (const inner of innerRules) {
        rules.push({
          key: `${prop}:${inner.key}`,
          css: `${prop} { ${inner.css} }`,
        });
      }
    } else {
      // Regular CSS property
      const kebabProp = toKebabCase(prop);
      declarations.push(`${kebabProp}: ${serializeValue(prop, value as string | number)}`);
    }
  }

  // Add the base rule with all plain declarations
  if (declarations.length > 0) {
    rules.unshift({
      key: selector,
      css: `${selector} { ${declarations.join('; ')}; }`,
    });
  }

  return rules;
}
