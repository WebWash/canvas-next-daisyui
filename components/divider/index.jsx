import { cva } from 'class-variance-authority';
import { cn } from 'drupal-canvas';

const dividerVariants = cva('divider', {
  variants: {
    direction: {
      vertical: 'divider-vertical',
      horizontal: 'divider-horizontal',
    },
    color: {
      default: '',
      neutral: 'divider-neutral',
      primary: 'divider-primary',
      secondary: 'divider-secondary',
      accent: 'divider-accent',
      info: 'divider-info',
      success: 'divider-success',
      warning: 'divider-warning',
      error: 'divider-error',
    },
    placement: {
      center: '',
      start: 'divider-start',
      end: 'divider-end',
    },
  },
});

const Divider = ({ text, direction, color, placement, className }) => {
  return (
    <div className={cn(dividerVariants({ direction, color, placement }), className)}>
      {text}
    </div>
  );
};

export default Divider;
