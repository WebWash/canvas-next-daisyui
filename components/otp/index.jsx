'use client';

import { cva } from 'class-variance-authority';

import { useDomId } from '@/lib/dom-id';
import { FieldText } from '@/lib/field';

const otpVariants = cva('otp', {
  variants: {
    joined: {
      true: 'otp-joined',
      false: '',
    },
    color: {
      default: '',
      neutral: 'otp-neutral',
      primary: 'otp-primary',
      secondary: 'otp-secondary',
      accent: 'otp-accent',
      info: 'otp-info',
      success: 'otp-success',
      warning: 'otp-warning',
      error: 'otp-error',
    },
    size: {
      xs: 'otp-xs',
      sm: 'otp-sm',
      md: 'otp-md',
      lg: 'otp-lg',
      xl: 'otp-xl',
    },
  },
});

const Otp = ({
  label,
  hideLabel,
  description,
  name,
  required,
  disabled,
  length = 4,
  joined = false,
  color,
  size,
  className,
}) => {
  const id = useDomId();
  const descriptionId = description ? `${id}-description` : undefined;
  const digits = Number(length);

  // The number of spans, maxlength and pattern must agree.
  return (
    <FieldText
      label={label}
      hideLabel={hideLabel}
      description={description}
      descriptionId={descriptionId}
      className={className}
    >
      <label className={otpVariants({ joined, color, size })}>
        {Array.from({ length: digits }, (_, index) => (
          <span key={index} />
        ))}
        <input
          type="text"
          name={name}
          required={required}
          disabled={disabled}
          autoComplete="one-time-code"
          inputMode="numeric"
          maxLength={digits}
          pattern={`[0-9]{${digits}}`}
          aria-label={label}
          aria-describedby={descriptionId}
        />
      </label>
    </FieldText>
  );
};

export default Otp;
