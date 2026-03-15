import type { ComponentProps } from 'react';
import { Link as AriaLink } from 'react-aria-components';
import { styles } from 'typestyles';
import { designTokens as t } from '../tokens';
import { cx } from './utils';

const dsLink = styles.class('ds-link', {
  color: t.color.accent,
  fontSize: t.font.sizeMd,
  textDecoration: 'none',
  fontWeight: t.font.weightMedium,
  '&:hover': {
    textDecoration: 'underline',
  },
  '&:focus-visible': {
    outline: `2px solid ${t.color.focusRing}`,
    outlineOffset: '2px',
    borderRadius: t.radius.sm,
  },
});

export type LinkProps = Omit<ComponentProps<typeof AriaLink>, 'className'> & {
  className?: string;
};

export function Link({ className, ...props }: LinkProps) {
  return <AriaLink {...props} className={cx(dsLink, className)} />;
}
