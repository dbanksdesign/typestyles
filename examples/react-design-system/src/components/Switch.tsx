import type { ComponentProps, ReactNode } from 'react';
import { Switch as AriaSwitch } from 'react-aria-components';
import { styles } from 'typestyles';
import { designTokens as t } from '../tokens';

const dsSwitch = styles.create('ds-switch', {
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: t.space.sm,
    cursor: 'pointer',
  },
  track: {
    position: 'relative',
    width: '40px',
    height: '24px',
    borderRadius: t.radius.full,
    backgroundColor: t.color.border,
    transition: 'background-color 140ms ease',
    '&[data-selected]': {
      backgroundColor: t.color.accent,
    },
  },
  thumb: {
    position: 'absolute',
    top: '3px',
    left: '3px',
    width: '18px',
    height: '18px',
    borderRadius: t.radius.full,
    backgroundColor: t.color.surface,
    transition: 'transform 140ms ease',
    '&[data-selected]': {
      transform: 'translateX(16px)',
    },
  },
  label: {
    fontSize: t.font.sizeMd,
  },
});

export type SwitchProps = Omit<ComponentProps<typeof AriaSwitch>, 'children'> & {
  children?: ReactNode;
};

export function Switch({ children, ...props }: SwitchProps) {
  return (
    <AriaSwitch {...props} className={dsSwitch('root')}>
      {({ isSelected }) => (
        <>
          <span className={dsSwitch('track')} data-selected={isSelected || undefined}>
            <span className={dsSwitch('thumb')} data-selected={isSelected || undefined} />
          </span>
          <span className={dsSwitch('label')}>{children}</span>
        </>
      )}
    </AriaSwitch>
  );
}
