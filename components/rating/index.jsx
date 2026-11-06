'use client';

import { cva } from 'class-variance-authority';
import { cn } from 'drupal-canvas';

import { useDomId } from '@/lib/dom-id';
import { FieldText } from '@/lib/field';

const ratingVariants = cva('rating', {
  variants: {
    half: {
      true: 'rating-half',
      false: '',
    },
    size: {
      xs: 'rating-xs',
      sm: 'rating-sm',
      md: 'rating-md',
      lg: 'rating-lg',
      xl: 'rating-xl',
    },
  },
});

const SHAPES = {
  star: 'mask-star',
  star_2: 'mask-star-2',
  heart: 'mask-heart',
};

const FILLS = {
  default: '',
  neutral: 'bg-neutral',
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  accent: 'bg-accent',
  info: 'bg-info',
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
};

const stepLabel = (value) => `${value} ${value === 1 ? 'star' : 'stars'}`;

const Rating = ({
  label,
  hideLabel,
  description,
  name,
  required,
  disabled,
  max = 5,
  value,
  half = false,
  readOnly = false,
  shape = 'star',
  size,
  color = 'default',
  className,
}) => {
  const id = useDomId();
  const descriptionId = description ? `${id}-description` : undefined;
  const count = Number(max);
  const increment = half ? 0.5 : 1;

  // Half steps need two masks per star. Whole steps need one.
  const steps = Array.from(
    { length: count / increment },
    (_, index) => (index + 1) * increment,
  );
  const maskFor = (step) =>
    cn(
      'mask',
      SHAPES[shape],
      half && (step % 1 === 0 ? 'mask-half-2' : 'mask-half-1'),
      FILLS[color],
    );

  return (
    <FieldText
      label={label}
      hideLabel={hideLabel}
      description={description}
      descriptionId={descriptionId}
      className={className}
    >
      {readOnly ? (
        <div
          role="img"
          aria-label={`${label}: rated ${value ?? 0} of ${count}`}
          aria-describedby={descriptionId}
          className={ratingVariants({ half, size })}
        >
          {steps.map((step) => (
            <div
              key={step}
              aria-label={stepLabel(step)}
              aria-current={step === Number(value) ? 'true' : undefined}
              className={maskFor(step)}
            />
          ))}
        </div>
      ) : (
        <div
          role="radiogroup"
          aria-label={label}
          aria-describedby={descriptionId}
          className={ratingVariants({ half, size })}
        >
          <input
            type="radio"
            name={name || id}
            value="0"
            aria-label="No rating"
            required={required}
            disabled={disabled}
            defaultChecked={!value}
            className="rating-hidden"
          />
          {steps.map((step) => (
            <input
              key={step}
              type="radio"
              name={name || id}
              value={step}
              aria-label={stepLabel(step)}
              disabled={disabled}
              defaultChecked={step === Number(value)}
              className={maskFor(step)}
            />
          ))}
        </div>
      )}
    </FieldText>
  );
};

export default Rating;
