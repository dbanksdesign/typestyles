import type { ComponentProps } from 'react';
import {
  Button as AriaButton,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select as AriaSelect,
  SelectValue,
} from 'react-aria-components';
import { styles } from 'typestyles';
import { designTokens as t } from '../tokens';

const dsSelect = styles.create('ds-select', {
  root: {
    display: 'grid',
    gap: t.space.xs,
    minWidth: '240px',
  },
  label: {
    fontSize: t.font.sizeMd,
    fontWeight: t.font.weightMedium,
    color: t.color.text,
  },
  trigger: {
    textAlign: 'left',
    border: `1px solid ${t.color.border}`,
    borderRadius: t.radius.md,
    padding: `${t.space.sm} ${t.space.md}`,
    backgroundColor: t.color.surface,
    color: t.color.text,
    fontSize: t.font.sizeMd,
    cursor: 'pointer',
    '&:focus-visible': {
      outline: `2px solid ${t.color.focusRing}`,
      outlineOffset: '1px',
      borderColor: t.color.focusRing,
    },
  },
  popover: {
    border: `1px solid ${t.color.border}`,
    borderRadius: t.radius.md,
    backgroundColor: t.color.surface,
    boxShadow: t.shadow.md,
    padding: t.space.xs,
  },
  item: {
    fontSize: t.font.sizeMd,
    padding: `${t.space.sm} ${t.space.md}`,
    borderRadius: t.radius.sm,
    cursor: 'pointer',
    '&[data-focused]': {
      backgroundColor: t.color.surfaceMuted,
    },
    '&[data-selected]': {
      color: t.color.accent,
      fontWeight: t.font.weightSemibold,
    },
  },
});

export type SelectOption = {
  id: string;
  label: string;
};

export type SelectProps = Omit<ComponentProps<typeof AriaSelect>, 'children'> & {
  label?: string;
  options: SelectOption[];
  placeholder?: string;
};

export function Select({ label, options, placeholder = 'Select…', ...props }: SelectProps) {
  return (
    <AriaSelect {...props} className={dsSelect('root')}>
      {label ? <Label className={dsSelect('label')}>{label}</Label> : null}
      <AriaButton className={dsSelect('trigger')}>
        <SelectValue>{({ defaultChildren }) => defaultChildren ?? placeholder}</SelectValue>
      </AriaButton>
      <Popover className={dsSelect('popover')}>
        <ListBox>
          {options.map((option) => (
            <ListBoxItem key={option.id} id={option.id} className={dsSelect('item')}>
              {option.label}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </AriaSelect>
  );
}
