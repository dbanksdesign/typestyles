import { styles } from 'typestyles';
import { designTokens as t } from '../tokens';

export const textAreaField = {
  root: styles.class('text-area-field-root', {
    display: 'grid',
    gap: t.space[1],
  }),
  label: styles.class('text-area-field-label', {
    fontSize: t.fontSize.md,
    fontWeight: t.fontWeight.medium,
    color: t.color.text.primary,
  }),
  input: styles.class('text-area-field-input', {
    border: `1px solid ${t.color.border.default}`,
    borderRadius: t.radius.md,
    padding: `${t.space[2]} ${t.space[3]}`,
    fontSize: t.fontSize.md,
    backgroundColor: t.color.background.surface,
    color: t.color.text.primary,
    minHeight: '88px',
    resize: 'vertical',
    '&:focus': {
      outline: `2px solid ${t.color.border.focus}`,
      outlineOffset: '1px',
      borderColor: t.color.border.focus,
    },
    '&::placeholder': {
      color: t.color.text.secondary,
    },
  }),
  description: styles.class('text-area-field-description', {
    fontSize: t.fontSize.sm,
    color: t.color.text.secondary,
  }),
  error: styles.class('text-area-field-error', {
    fontSize: t.fontSize.sm,
    color: t.color.danger.default,
  }),
};
