import { cva } from 'class-variance-authority';
import { cn } from 'drupal-canvas';

const statusVariants = cva('status', {
  variants: {
    color: {
      default: '',
      neutral: 'status-neutral',
      primary: 'status-primary',
      secondary: 'status-secondary',
      accent: 'status-accent',
      info: 'status-info',
      success: 'status-success',
      warning: 'status-warning',
      error: 'status-error',
    },
    size: {
      xs: 'status-xs',
      sm: 'status-sm',
      md: 'status-md',
      lg: 'status-lg',
      xl: 'status-xl',
    },
  },
});

const Status = ({ color, size, label, className }) => {
  return (
    <span className={cn(statusVariants({ color, size }), className)}>
      <span className="sr-only">{label}</span>
    </span>
  );
};

export default Status;
