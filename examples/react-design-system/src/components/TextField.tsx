import { FieldError, Input, Label, TextField as AriaTextField } from 'react-aria-components';
import { styles } from 'typestyles';
import { designTokens as t } from '../tokens';
import type { BaseTextFieldProps } from './utils';

const dsTextField = styles.create('ds-text-field', {
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
  input: {
    border: `1px solid ${t.color.border}`,
    borderRadius: t.radius.md,
    padding: `${t.space.sm} ${t.space.md}`,
    fontSize: t.font.sizeMd,
    backgroundColor: t.color.surface,
    color: t.color.text,
    '&:focus': {
      outline: `2px solid ${t.color.focusRing}`,
      outlineOffset: '1px',
      borderColor: t.color.focusRing,
    },
    '&::placeholder': {
      color: t.color.textMuted,
    },
  },
  description: {
    fontSize: t.font.sizeSm,
    color: t.color.textMuted,
  },
  error: {
    fontSize: t.font.sizeSm,
    color: t.color.danger,
  },
});

export type TextFieldProps = BaseTextFieldProps & {
  placeholder?: string;
};

export function TextField({ label, description, errorMessage, placeholder, ...props }: TextFieldProps) {
  return (
    <AriaTextField {...props} className={dsTextField('root')}>
      {label ? <Label className={dsTextField('label')}>{label}</Label> : null}
      <Input className={dsTextField('input')} placeholder={placeholder} />
      {description ? <p className={dsTextField('description')}>{description}</p> : null}
      <FieldError className={dsTextField('error')}>{errorMessage ?? ''}</FieldError>
    </AriaTextField>
  );
}
