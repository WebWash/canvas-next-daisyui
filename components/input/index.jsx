'use client';

import { cva } from 'class-variance-authority';

import { Field } from '@/lib/field';

const inputVariants = cva('input', {
  variants: {
    variant: {
      default: '',
      ghost: 'input-ghost',
    },
    color: {
      default: '',
      neutral: 'input-neutral',
      primary: 'input-primary',
      secondary: 'input-secondary',
      accent: 'input-accent',
      info: 'input-info',
      success: 'input-success',
      warning: 'input-warning',
      error: 'input-error',
    },
    size: {
      xs: 'input-xs',
      sm: 'input-sm',
      md: 'input-md',
      lg: 'input-lg',
      xl: 'input-xl',
    },
  },
});

const Input = ({
  variant,
  label,
  hideLabel,
  description,
  name,
  required,
  disabled,
  validationMessage,
  labelStyle = 'stacked',
  type = 'text',
  placeholder,
  value,
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
      controlClass={inputVariants({ variant, color, size })}
      className={className}
      render={(control) => (
        <input
          {...control}
          type={type}
          name={name}
          required={required}
          disabled={disabled}
          // A floating label only works while a placeholder is showing.
          placeholder={labelStyle === 'floating' ? placeholder || label : placeholder}
          defaultValue={value}
        />
      )}
    />
  );
};

export default Input;
