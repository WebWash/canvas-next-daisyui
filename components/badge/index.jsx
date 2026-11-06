import { cva } from 'class-variance-authority';
import { cn } from 'drupal-canvas';

const badgeVariants = cva('badge w-fit', {
  variants: {
    variant: {
      default: '',
      outline: 'badge-outline',
      dash: 'badge-dash',
      soft: 'badge-soft',
      ghost: 'badge-ghost',
    },
    color: {
      default: '',
      neutral: 'badge-neutral',
      primary: 'badge-primary',
      secondary: 'badge-secondary',
      accent: 'badge-accent',
      info: 'badge-info',
      success: 'badge-success',
      warning: 'badge-warning',
      error: 'badge-error',
    },
    size: {
      xs: 'badge-xs',
      sm: 'badge-sm',
      md: 'badge-md',
      lg: 'badge-lg',
      xl: 'badge-xl',
    },
  },
});

const Badge = ({ variant, text, color, size, className }) => {
  return (
    <span className={cn(badgeVariants({ variant, color, size }), className)}>
      {text}
    </span>
  );
};

export default Badge;
