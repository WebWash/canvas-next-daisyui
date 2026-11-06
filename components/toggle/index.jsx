'use client';

import { cva } from 'class-variance-authority';

import { CheckField } from '@/lib/field';

const toggleVariants = cva('toggle', {
  variants: {
    color: {
      default: '',
      neutral: 'toggle-neutral',
      primary: 'toggle-primary',
      secondary: 'toggle-secondary',
      accent: 'toggle-accent',
      info: 'toggle-info',
      success: 'toggle-success',
      warning: 'toggle-warning',
      error: 'toggle-error',
    },
    size: {
      xs: 'toggle-xs',
      sm: 'toggle-sm',
      md: 'toggle-md',
      lg: 'toggle-lg',
      xl: 'toggle-xl',
    },
  },
});

const Toggle = ({ color, size, ...field }) => {
  return (
    <CheckField {...field} controlClass={toggleVariants({ color, size })} />
  );
};

export default Toggle;
