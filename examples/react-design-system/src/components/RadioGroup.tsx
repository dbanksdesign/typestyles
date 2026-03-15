import type { ComponentProps } from 'react';
import { Label, Radio as AriaRadio, RadioGroup as AriaRadioGroup } from 'react-aria-components';
import { styles } from 'typestyles';
import { designTokens as t } from '../tokens';

const dsRadio = styles.create('ds-radio', {
  group: {
    display: 'grid',
    gap: t.space.xs,
  },
  item: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: t.space.sm,
    cursor: 'pointer',
  },
  control: {
    width: '18px',
    height: '18px',
    borderRadius: t.radius.full,
    border: `1px solid ${t.color.borderStrong}`,
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
      backgroundColor: t.color.accent,
    },
  },
  label: {
    fontSize: t.font.sizeMd,
  },
  groupLabel: {
    fontSize: t.font.sizeMd,
    fontWeight: t.font.weightMedium,
    color: t.color.text,
  },
});

export type RadioGroupOption = {
  value: string;
  label: string;
};

export type RadioGroupProps = Omit<ComponentProps<typeof AriaRadioGroup>, 'children'> & {
  label?: string;
  options: RadioGroupOption[];
};

export function RadioGroup({ label, options, ...props }: RadioGroupProps) {
  return (
    <AriaRadioGroup {...props} className={dsRadio('group')}>
      {label ? <Label className={dsRadio('groupLabel')}>{label}</Label> : null}
      {options.map((option) => (
        <AriaRadio key={option.value} value={option.value} className={dsRadio('item')}>
          {({ isSelected }) => (
            <>
              <span className={dsRadio('control')} data-selected={isSelected || undefined} />
              <span className={dsRadio('label')}>{option.label}</span>
            </>
          )}
        </AriaRadio>
      ))}
    </AriaRadioGroup>
  );
}
