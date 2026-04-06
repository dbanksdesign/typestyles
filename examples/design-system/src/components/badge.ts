import { styles } from '../runtime';
import { designTokens as t } from '../tokens';

export const badge = styles.component(
  'badge',
  (c) => {
    const v = c.vars({
      borderColor: {
        value: `${t.color.border.default}`,
        syntax: '<color>',
        inherits: false,
      },
      backgroundColor: {
        value: `${t.color.background.subtle}`,
        syntax: '<color>',
        inherits: false,
      },
      textColor: {
        value: `${t.color.text.secondary}`,
        syntax: '<color>',
        inherits: false,
      },
    });
    return {
      base: {
        display: 'inline-flex',
        alignItems: 'center',
        fontSize: t.fontSize.sm,
        fontWeight: t.fontWeight.semibold,
        lineHeight: 1,
        padding: `${t.space[1]} ${t.space[2]}`,
        borderRadius: t.radius.full,
        border: `1px solid ${v.borderColor.var}`,
        backgroundColor: v.backgroundColor.var,
        color: v.textColor.var,
      },
      variants: {
        tone: {
          neutral: {},
          accent: {
            [v.borderColor.name]:
              `color-mix(in srgb, ${t.color.accent.default} 45%, ${t.color.border.default})`,
            [v.backgroundColor.name]:
              `color-mix(in srgb, ${t.color.accent.default} 14%, ${t.color.background.surface})`,
            [v.textColor.name]: t.color.accent.default,
          },
          success: {
            [v.borderColor.name]:
              `color-mix(in srgb, ${t.color.success.default} 40%, ${t.color.border.default})`,
            [v.backgroundColor.name]:
              `color-mix(in srgb, ${t.color.success.default} 12%, ${t.color.background.surface})`,
            [v.textColor.name]: t.color.success.default,
          },
          warning: {
            [v.borderColor.name]:
              `color-mix(in srgb, ${t.color.warning.default} 40%, ${t.color.border.default})`,
            [v.backgroundColor.name]:
              `color-mix(in srgb, ${t.color.warning.default} 14%, ${t.color.background.surface})`,
            [v.textColor.name]: t.color.warning.default,
          },
          danger: {
            [v.borderColor.name]:
              `color-mix(in srgb, ${t.color.danger.default} 40%, ${t.color.border.default})`,
            [v.backgroundColor.name]:
              `color-mix(in srgb, ${t.color.danger.default} 12%, ${t.color.background.surface})`,
            [v.textColor.name]: t.color.danger.default,
          },
          tip: {
            [v.borderColor.name]:
              `color-mix(in srgb, ${t.color.info.default} 40%, ${t.color.border.default})`,
            [v.backgroundColor.name]:
              `color-mix(in srgb, ${t.color.info.default} 12%, ${t.color.background.surface})`,
            [v.textColor.name]: t.color.info.default,
          },
        },
      },
      defaultVariants: { tone: 'neutral' },
    };
  },
  { layer: 'components' },
);
