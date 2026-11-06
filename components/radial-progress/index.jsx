import { cva } from 'class-variance-authority';
import { cn } from 'drupal-canvas';

const radialVariants = cva('radial-progress', {
  variants: {
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
});

const SIZES = { sm: '3.5rem', md: '5rem', lg: '8rem' };
const THICKNESS = { thin: '0.25rem', thick: '0.75rem' };

const RadialProgress = ({
  value,
  label,
  color,
  size = 'md',
  thickness = 'normal',
  className,
}) => {
  const clamped = Math.min(100, Math.max(0, Number(value) || 0));
  const style = { '--value': clamped, '--size': SIZES[size] };
  if (THICKNESS[thickness]) {
    style['--thickness'] = THICKNESS[thickness];
  }

  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label || 'Progress'}
      className={cn(radialVariants({ color }), className)}
      style={style}
    >
      {label || `${clamped}%`}
    </div>
  );
};

export default RadialProgress;
