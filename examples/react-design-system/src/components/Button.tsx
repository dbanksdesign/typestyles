import type { ComponentProps } from 'react';
import { Button as AriaButton } from 'react-aria-components';
import { styles } from 'typestyles';
import { designTokens as t } from '../tokens';
import { cx } from './utils';

const dsButtonBase = styles.class('ds-button', {
  appearance: 'none',
  border: `1px solid ${t.color.border}`,
  borderRadius: t.radius.md,
  backgroundColor: t.color.surface,
  color: t.color.text,
  fontSize: t.font.sizeMd,
  fontWeight: t.font.weightMedium,
  padding: `${t.space.sm} ${t.space.lg}`,
  cursor: 'pointer',
  transition: 'background-color 140ms ease, border-color 140ms ease, transform 80ms ease',
  '&:hover': {
    borderColor: t.color.borderStrong,
    backgroundColor: t.color.surfaceMuted,
  },
  '&:active': {
    transform: 'translateY(1px)',
  },
  '&:focus-visible': {
    outline: `2px solid ${t.color.focusRing}`,
    outlineOffset: '2px',
  },
  '&[data-disabled]': {
    opacity: 0.55,
    cursor: 'not-allowed',
  },
});

const dsButtonIntent = {
  primary: styles.hashClass(
    {
      borderColor: t.color.accent,
      backgroundColor: t.color.accent,
      color: t.color.accentForeground,
      '&:hover': {
        backgroundColor: t.color.accentHover,
        borderColor: t.color.accentHover,
      },
    },
    'button-primary',
  ),
  secondary: '',
  ghost: styles.hashClass(
    {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      '&:hover': {
        backgroundColor: t.color.surfaceMuted,
      },
    },
    'button-ghost',
  ),
} as const;

export type ButtonProps = Omit<ComponentProps<typeof AriaButton>, 'className'> & {
  className?: string;
  intent?: 'primary' | 'secondary' | 'ghost';
};

export function Button({ intent = 'secondary', className, ...props }: ButtonProps) {
  return <AriaButton {...props} className={cx(dsButtonBase, dsButtonIntent[intent], className)} />;
}
