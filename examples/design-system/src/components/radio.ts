import { styles } from 'typestyles';
import { designTokens as t } from '../tokens';

export const radio = {
  group: styles.class('radio-group', {
    display: 'grid',
    gap: t.space[1],
  }),
  item: styles.class('radio-item', {
    display: 'inline-flex',
    alignItems: 'center',
    gap: t.space[2],
    cursor: 'pointer',
  }),
  control: styles.class('radio-control', {
    width: '18px',
    height: '18px',
    borderRadius: t.radius.full,
    border: `1px solid ${t.color.border.strong}`,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&::before': {
      content: '""',
      width: '8px',
      height: '8px',
      borderRadius: t.radius.full,
      backgroundColor: 'transparent',
      transition: 'background-color 120ms ease',
    },
    '&[data-selected]::before': {
      backgroundColor: t.color.accent.default,
    },
  }),
  label: styles.class('radio-label', {
    fontSize: t.fontSize.md,
  }),
  groupLabel: styles.class('radio-groupLabel', {
    fontSize: t.fontSize.md,
    fontWeight: t.fontWeight.medium,
    color: t.color.text.primary,
  }),
};
