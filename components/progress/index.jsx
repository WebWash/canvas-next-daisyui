import { cva } from 'class-variance-authority';
import { cn } from 'drupal-canvas';

const progressVariants = cva('progress', {
  variants: {
    color: {
      default: '',
      neutral: 'progress-neutral',
      primary: 'progress-primary',
      secondary: 'progress-secondary',
      accent: 'progress-accent',
      info: 'progress-info',
      success: 'progress-success',
      warning: 'progress-warning',
      error: 'progress-error',
    },
  },
});

/** Leave the value empty for an indeterminate bar. */
const Progress = ({ value, max, color, className }) => {
  return (
    <progress
      aria-label="Progress"
      className={cn(progressVariants({ color }), className)}
      value={value}
      max={max}
    />
  );
};

export default Progress;
