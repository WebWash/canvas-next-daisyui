'use client';

import { cva } from 'class-variance-authority';

import { Field } from '@/lib/field';

const fileVariants = cva('file-input', {
  variants: {
    variant: {
      default: '',
      ghost: 'file-input-ghost',
    },
    color: {
      default: '',
      neutral: 'file-input-neutral',
      primary: 'file-input-primary',
      secondary: 'file-input-secondary',
      accent: 'file-input-accent',
      info: 'file-input-info',
      success: 'file-input-success',
      warning: 'file-input-warning',
      error: 'file-input-error',
    },
    size: {
      xs: 'file-input-xs',
      sm: 'file-input-sm',
      md: 'file-input-md',
      lg: 'file-input-lg',
      xl: 'file-input-xl',
    },
  },
});

const FileInput = ({
  variant,
  label,
  hideLabel,
  description,
  name,
  required,
  disabled,
  accept,
  multiple,
  color,
  size,
  className,
}) => {
  return (
    <Field
      label={label}
      hideLabel={hideLabel}
      description={description}
      controlClass={fileVariants({ variant, color, size })}
      className={className}
      render={(control) => (
        <input
          {...control}
          type="file"
          name={name}
          required={required}
          disabled={disabled}
          accept={accept}
          multiple={multiple}
        />
      )}
    />
  );
};

export default FileInput;
