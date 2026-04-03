import { tokens, type ThemeSurface, type TokenValues } from 'typestyles';
import type {
  DeepPartial,
  DesignPrimitiveOverrides,
  DesignSemanticValues,
  DesignTheme,
  DesignThemeConfig,
} from './types';

type ThemeOverrideMap = Record<string, TokenValues | undefined>;

function flattenSemanticValues(semantic: DeepPartial<DesignSemanticValues>): ThemeOverrideMap {
  const out: ThemeOverrideMap = {};
  if (semantic.color != null) out.color = semantic.color as TokenValues;
  if (semantic.syntax != null) out.syntax = semantic.syntax as TokenValues;
  return out;
}

function flattenPrimitiveOverrides(primitives: DesignPrimitiveOverrides): ThemeOverrideMap {
  return Object.fromEntries(
    Object.entries(primitives).filter(([, values]) => values && Object.keys(values).length > 0),
  ) as ThemeOverrideMap;
}

export function createDesignTheme(config: DesignThemeConfig): DesignTheme {
  const lightOverrides = {
    ...flattenSemanticValues(config.light),
    ...flattenPrimitiveOverrides(config.primitives ?? {}),
    ...(config.components?.codeBlock ? { codeBlock: config.components.codeBlock } : {}),
  };

  const darkOverrides = flattenSemanticValues(config.dark);

  const surface: ThemeSurface = tokens.createTheme(config.name, {
    base: lightOverrides,
    colorMode: tokens.colorMode.systemWithLightDarkOverride({
      attribute: 'data-mode',
      values: { light: 'light', dark: 'dark' },
      scope: 'self',
      light: flattenSemanticValues(config.light),
      dark: darkOverrides,
    }),
  });

  return {
    className: surface.className,
    name: config.name,
    lightValues: config.light,
    darkValues: config.dark,
    primitiveOverrides: config.primitives,
  };
}
