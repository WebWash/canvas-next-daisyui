import { cva } from 'class-variance-authority';
import { cn } from 'drupal-canvas';

import { sample } from '@/lib/sample';

const outerVariants = cva('w-full', {
  variants: {
    background: {
      none: '',
      base_100: 'bg-base-100 text-base-content',
      base_200: 'bg-base-200 text-base-content',
      base_300: 'bg-base-300 text-base-content',
      neutral: 'bg-neutral text-neutral-content',
      primary: 'bg-primary text-primary-content',
    },
    paddingY: {
      none: '',
      sm: 'py-4',
      md: 'py-8',
      lg: 'py-16',
    },
  },
  defaultVariants: {
    background: 'none',
    paddingY: 'md',
  },
});

const innerVariants = cva('mx-auto flex w-full flex-col px-4', {
  variants: {
    width: {
      normal: 'max-w-2xl',
      wide: 'max-w-6xl',
      full: 'max-w-none',
    },
    gap: {
      none: '',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-8',
    },
  },
  defaultVariants: {
    width: 'normal',
    gap: 'md',
  },
});

const Section = ({ width, background, paddingY, gap, content, className }) => {
  return (
    <div className={cn(outerVariants({ background, paddingY }), className)}>
      <div className={innerVariants({ width, gap })}>{sample(content, () => (
        <>
          <h2 className="text-3xl font-bold">Section heading</h2>
          <p>A section holds the width, background and spacing for what goes inside it.</p>
        </>
      ))}</div>
    </div>
  );
};

export default Section;
