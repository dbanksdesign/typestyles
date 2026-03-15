import { FieldError, Label, TextArea, TextField as AriaTextField } from 'react-aria-components';
import { styles } from 'typestyles';
import { designTokens as t } from '../tokens';
import type { BaseTextFieldProps } from './utils';

const dsTextAreaField = styles.create('ds-text-area-field', {
  root: {
    display: 'grid',
    gap: t.space.xs,
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
    minHeight: '88px',
    resize: 'vertical',
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

export type TextAreaFieldProps = BaseTextFieldProps & {
  placeholder?: string;
};

export function TextAreaField({
  label,
  description,
  errorMessage,
  placeholder,
  ...props
}: TextAreaFieldProps) {
  return (
    <AriaTextField {...props} className={dsTextAreaField('root')}>
      {label ? <Label className={dsTextAreaField('label')}>{label}</Label> : null}
      <TextArea className={dsTextAreaField('input')} placeholder={placeholder} />
      {description ? <p className={dsTextAreaField('description')}>{description}</p> : null}
      <FieldError className={dsTextAreaField('error')}>{errorMessage ?? ''}</FieldError>
    </AriaTextField>
  );
}
