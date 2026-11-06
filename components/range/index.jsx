'use client';

import { cva } from 'class-variance-authority';

import { Field } from '@/lib/field';

const rangeVariants = cva('range', {
  variants: {
    vertical: {
      true: 'range-vertical',
      false: '',
    },
    color: {
      default: '',
      neutral: 'range-neutral',
      primary: 'range-primary',
      secondary: 'range-secondary',
      accent: 'range-accent',
      info: 'range-info',
      success: 'range-success',
      warning: 'range-warning',
      error: 'range-error',
    },
    size: {
      xs: 'range-xs',
      sm: 'range-sm',
      md: 'range-md',
      lg: 'range-lg',
      xl: 'range-xl',
    },
  },
});

const Range = ({
  label,
  hideLabel,
  description,
  name,
  required,
  disabled,
  min,
  max,
  value,
  step,
  vertical = false,
  color,
  size,
  className,
}) => {
  return (
    <Field
      label={label}
      hideLabel={hideLabel}
      description={description}
      controlClass={rangeVariants({ vertical, color, size })}
      className={className}
      render={(control) => (
        <input
          {...control}
          type="range"
          name={name}
          required={required}
          disabled={disabled}
          min={min}
          max={max}
          step={step}
          defaultValue={value}
        />
      )}
    />
  );
};

export default Range;
