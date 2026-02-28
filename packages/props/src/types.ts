/**
 * A single condition definition (e.g., media query, selector, container query).
 */
export interface ConditionDefinition {
  name?: string;
  '@media'?: string;
  '@container'?: string;
  '@supports'?: string;
  selector?: string;
}

/**
 * A map of condition names to their definitions.
 */
export type ConditionDefinitions = Record<string, ConditionDefinition>;

/**
 * Property value definitions - either an array of strings or a map of keys to CSS values.
 */
export type PropertyValues = string[] | Record<string, string | number>;

/**
 * A map of CSS property names to their allowed values.
 */
export type PropertyDefinitions = Record<string, PropertyValues>;

/**
 * Shorthand definitions - map shorthand names to arrays of property names.
 */
export type ShorthandDefinitions<P extends PropertyDefinitions> = Record<string, Array<keyof P>>;

/**
 * The configuration object passed to defineProperties().
 */
export interface DefinePropertiesConfig<
  P extends PropertyDefinitions,
  C extends ConditionDefinitions,
  S extends ShorthandDefinitions<P>,
> {
  properties: P;
  conditions?: C;
  defaultCondition?: keyof C | false;
  shorthands?: S;
}

/**
 * A property collection returned by defineProperties().
 */
export interface PropertyCollection<
  P extends PropertyDefinitions,
  C extends ConditionDefinitions,
  S extends ShorthandDefinitions<P>,
> {
  readonly properties: P;
  readonly conditions: C;
  readonly defaultCondition: keyof C | false;
  readonly shorthands: S;
}

/**
 * Extract value type from PropertyValues.
 */
type ExtractValue<T> = T extends (infer U)[]
  ? U
  : T extends Record<string, unknown>
    ? keyof T
    : never;

/**
 * Create a prop value type that can be a direct value or a conditional object.
 */
type PropValue<V, C extends ConditionDefinitions> =
  | V
  | {
      [K in keyof C]?: V;
    };

/**
 * Extract prop types from a property collection.
 */
export type ExtractProps<
  P extends PropertyDefinitions,
  C extends ConditionDefinitions,
  S extends ShorthandDefinitions<P>,
> = {
  [K in keyof P | keyof S]?: K extends keyof S
    ? PropValue<ExtractValue<P[S[K][number]]>, C>
    : K extends keyof P
      ? PropValue<ExtractValue<P[K]>, C>
      : never;
};

/**
 * The props function signature.
 */
export type PropsFunction<
  Collections extends PropertyCollection<
    PropertyDefinitions,
    ConditionDefinitions,
    ShorthandDefinitions<PropertyDefinitions>
  >[],
> = ((
  props: UnionToIntersection<
    {
      [I in keyof Collections]: Collections[I] extends PropertyCollection<infer P, infer C, infer S>
        ? ExtractProps<P, C, S>
        : never;
    }[number]
  >,
) => string) & {
  properties: Set<string>;
};

/**
 * Convert a union type to an intersection type.
 */
type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;
