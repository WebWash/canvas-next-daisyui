'use client';

import { cva } from 'class-variance-authority';

import { CheckField } from '@/lib/field';

const checkboxVariants = cva('checkbox', {
  variants: {
    color: {
      default: '',
      neutral: 'checkbox-neutral',
      primary: 'checkbox-primary',
      secondary: 'checkbox-secondary',
      accent: 'checkbox-accent',
      info: 'checkbox-info',
      success: 'checkbox-success',
      warning: 'checkbox-warning',
      error: 'checkbox-error',
    },
    size: {
      xs: 'checkbox-xs',
      sm: 'checkbox-sm',
      md: 'checkbox-md',
      lg: 'checkbox-lg',
      xl: 'checkbox-xl',
    },
  },
});

const Checkbox = ({ color, size, ...field }) => {
  return (
    <CheckField {...field} controlClass={checkboxVariants({ color, size })} />
  );
};

export default Checkbox;
