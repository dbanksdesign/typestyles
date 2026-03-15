import type { ComponentProps } from 'react';
import { TextField as AriaTextField } from 'react-aria-components';

export function cx(...parts: Array<string | undefined | false>): string {
  return parts.filter(Boolean).join(' ');
}

export type FieldMeta = {
  label?: string;
  description?: string;
  errorMessage?: string;
};

export type BaseTextFieldProps = Omit<ComponentProps<typeof AriaTextField>, 'children'> & FieldMeta;
