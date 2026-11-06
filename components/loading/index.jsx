import { cva } from 'class-variance-authority';
import { cn } from 'drupal-canvas';

const loadingVariants = cva('loading', {
  variants: {
    variant: {
      spinner: 'loading-spinner',
      dots: 'loading-dots',
      ring: 'loading-ring',
      ball: 'loading-ball',
      bars: 'loading-bars',
      infinity: 'loading-infinity',
    },
    size: {
      xs: 'loading-xs',
      sm: 'loading-sm',
      md: 'loading-md',
      lg: 'loading-lg',
      xl: 'loading-xl',
    },
    color: {
      default: '',
      neutral: 'text-neutral',
      primary: 'text-primary',
      secondary: 'text-secondary',
      accent: 'text-accent',
      info: 'text-info',
      success: 'text-success',
      warning: 'text-warning',
      error: 'text-error',
    },
  },
  defaultVariants: {
    variant: 'spinner',
  },
});

const Loading = ({ variant, size, color, className }) => {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn(loadingVariants({ variant, size, color }), className)}
    />
  );
};

export default Loading;
