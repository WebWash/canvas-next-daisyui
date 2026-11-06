import { cva } from 'class-variance-authority';
import { cn } from 'drupal-canvas';

import ImageBlock from '@/components/image';
import { sample, sampleImage } from '@/lib/sample';

const stackVariants = cva('stack', {
  variants: {
    alignment: {
      default: '',
      top: 'stack-top',
      bottom: 'stack-bottom',
      start: 'stack-start',
      end: 'stack-end',
    },
    size: {
      sm: 'h-20 w-32',
      md: 'h-32 w-48',
      lg: 'h-48 w-72',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const Stack = ({ alignment, size, items, className }) => {
  return (
    <div className={cn(stackVariants({ alignment, size }), className)}>{sample(items, () => (
      <>
        <ImageBlock image={sampleImage('stacked-image-1', 400, 300, 'Stacked image 1')} shape="rounded" />
        <ImageBlock image={sampleImage('stacked-image-2', 400, 300, 'Stacked image 2')} shape="rounded" />
        <ImageBlock image={sampleImage('stacked-image-3', 400, 300, 'Stacked image 3')} shape="rounded" />
      </>
    ))}</div>
  );
};

export default Stack;
