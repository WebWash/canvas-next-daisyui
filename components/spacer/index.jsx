import { cva } from 'class-variance-authority';
import { cn } from 'drupal-canvas';

import { isWorkbenchDefaultTab } from '@/lib/sample';

const spacerVariants = cva('', {
  variants: {
    height: {
      small: 'h-8',
      medium: 'h-12',
      large: 'h-16',
      extra_large: 'h-24',
    },
  },
  defaultVariants: {
    height: 'medium',
  },
});

const Spacer = ({ height, className }) => {
  return <div aria-hidden="true" className={cn(
        spacerVariants({ height }),
        isWorkbenchDefaultTab() && 'rounded-box border border-dashed border-base-300 bg-base-200',
        className,
      )} />;
};

export default Spacer;
