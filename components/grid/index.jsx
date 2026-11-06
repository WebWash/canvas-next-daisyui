import { cva } from 'class-variance-authority';
import { cn } from 'drupal-canvas';

import Card from '@/components/card';
import { sample } from '@/lib/sample';

const gridVariants = cva('grid w-full [&>*]:min-w-0', {
  variants: {
    layout: {
      '50-50': 'md:grid-cols-[1fr_1fr]',
      '33-33-33': 'md:grid-cols-[1fr_1fr_1fr]',
      '75-25': 'md:grid-cols-[3fr_1fr]',
      '25-75': 'md:grid-cols-[1fr_3fr]',
      '67-33': 'md:grid-cols-[2fr_1fr]',
      '33-67': 'md:grid-cols-[1fr_2fr]',
      '50-25-25': 'md:grid-cols-[2fr_1fr_1fr]',
      '25-25-50': 'md:grid-cols-[1fr_1fr_2fr]',
      '25-25-25-25': 'sm:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_1fr_1fr]',
    },
    gap: {
      extra_small: 'gap-1',
      small: 'gap-2',
      medium: 'gap-4',
      large: 'gap-6',
      extra_large: 'gap-8',
    },
  },
  defaultVariants: {
    gap: 'medium',
    layout: '33-33-33',
  },
});

const Grid = ({ layout, gap, content, className }) => {
  return (
    <div className={cn(gridVariants({ layout, gap }), className)}>{sample(content, () => (
        <>
          <Card variant="border" title="First column" text="<p>Content for the first column.</p>" />
          <Card variant="border" title="Second column" text="<p>Content for the second column.</p>" />
        </>
      ))}</div>
  );
};

export default Grid;
