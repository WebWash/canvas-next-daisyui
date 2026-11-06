'use client';

import { cva } from 'class-variance-authority';

import { Field } from '@/lib/field';

const textareaVariants = cva('textarea', {
  variants: {
    variant: {
      default: '',
      ghost: 'textarea-ghost',
    },
    color: {
      default: '',
      neutral: 'textarea-neutral',
      primary: 'textarea-primary',
      secondary: 'textarea-secondary',
      accent: 'textarea-accent',
      info: 'textarea-info',
      success: 'textarea-success',
      warning: 'textarea-warning',
      error: 'textarea-error',
    },
    size: {
      xs: 'textarea-xs',
      sm: 'textarea-sm',
      md: 'textarea-md',
      lg: 'textarea-lg',
      xl: 'textarea-xl',
    },
  },
});

const Textarea = ({
  variant,
  label,
  hideLabel,
  description,
  name,
  required,
  disabled,
  validationMessage,
  labelStyle = 'stacked',
  placeholder,
  value,
  rows,
  color,
  size,
  className,
}) => {
  return (
    <Field
      label={label}
      hideLabel={hideLabel}
      description={description}
      validationMessage={validationMessage}
      labelStyle={labelStyle}
      controlClass={textareaVariants({ variant, color, size })}
      className={className}
      render={(control) => (
        <textarea
          {...control}
          name={name}
          required={required}
          disabled={disabled}
          rows={rows}
          // A floating label only works while a placeholder is showing.
          placeholder={labelStyle === 'floating' ? placeholder || label : placeholder}
          defaultValue={value}
        />
      )}
    />
  );
};

export default Textarea;
