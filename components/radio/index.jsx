'use client';

import { cva } from 'class-variance-authority';
import { cn } from 'drupal-canvas';

import { useDomId } from '@/lib/dom-id';

const radioVariants = cva('radio', {
  variants: {
    color: {
      default: '',
      neutral: 'radio-neutral',
      primary: 'radio-primary',
      secondary: 'radio-secondary',
      accent: 'radio-accent',
      info: 'radio-info',
      success: 'radio-success',
      warning: 'radio-warning',
      error: 'radio-error',
    },
    size: {
      xs: 'radio-xs',
      sm: 'radio-sm',
      md: 'radio-md',
      lg: 'radio-lg',
      xl: 'radio-xl',
    },
  },
});

const Radio = ({
  label,
  hideLabel,
  description,
  name,
  required,
  disabled,
  options,
  value,
  color,
  size,
  className,
}) => {
  const id = useDomId();
  const descriptionId = description ? `${id}-description` : undefined;

  return (
    <fieldset
      aria-describedby={descriptionId}
      className={cn('fieldset min-w-0', className)}
    >
      <legend className={cn('fieldset-legend', hideLabel && 'sr-only')}>
        {label}
      </legend>
      {(options ?? []).map((option) => (
        <label key={option} className="label w-fit cursor-pointer gap-2">
          <input
            type="radio"
            name={name || id}
            value={option}
            required={required}
            disabled={disabled}
            defaultChecked={option === value}
            className={radioVariants({ color, size })}
          />
          <span>{option}</span>
        </label>
      ))}
      {description && (
        <p id={descriptionId} className="label whitespace-normal">
          {description}
        </p>
      )}
    </fieldset>
  );
};

export default Radio;
