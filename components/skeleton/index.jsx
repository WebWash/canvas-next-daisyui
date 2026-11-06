import { cva } from 'class-variance-authority';
import { cn } from 'drupal-canvas';

const skeletonVariants = cva('skeleton', {
  variants: {
    width: {
      xs: 'w-16',
      sm: 'w-32',
      md: 'w-48',
      lg: 'w-64',
      full: 'w-full',
    },
    height: {
      xs: 'h-4',
      sm: 'h-8',
      md: 'h-16',
      lg: 'h-32',
    },
  },
  defaultVariants: {
    width: 'md',
    height: 'sm',
  },
});

const Skeleton = ({ variant = 'block', text, width, height, className }) => {
  if (variant === 'text') {
    return (
      <div className={cn('skeleton skeleton-text w-fit', className)}>
        {text || 'Loading...'}
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn(skeletonVariants({ width, height }), className)}
    />
  );
};

export default Skeleton;
