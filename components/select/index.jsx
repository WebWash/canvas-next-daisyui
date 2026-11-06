'use client';

import { cva } from 'class-variance-authority';

import { Field } from '@/lib/field';

const selectVariants = cva('select', {
  variants: {
    variant: {
      default: '',
      ghost: 'select-ghost',
    },
    color: {
      default: '',
      neutral: 'select-neutral',
      primary: 'select-primary',
      secondary: 'select-secondary',
      accent: 'select-accent',
      info: 'select-info',
      success: 'select-success',
      warning: 'select-warning',
      error: 'select-error',
    },
    size: {
      xs: 'select-xs',
      sm: 'select-sm',
      md: 'select-md',
      lg: 'select-lg',
      xl: 'select-xl',
    },
  },
});

const Select = ({
  variant,
  label,
  hideLabel,
  description,
  name,
  required,
  disabled,
  validationMessage,
  labelStyle = 'stacked',
  options,
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
      controlClass={selectVariants({ variant, color, size })}
      className={className}
      render={(control) => (
        <select
          {...control}
          name={name}
          required={required}
          disabled={disabled}
          defaultValue={value ?? (placeholder ? '' : undefined)}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {(options ?? []).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    />
  );
};

export default Select;
