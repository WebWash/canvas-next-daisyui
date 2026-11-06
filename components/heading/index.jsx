import { cva } from 'class-variance-authority';
import { cn } from 'drupal-canvas';

const containerVariants = cva('flex w-full flex-col', {
  variants: {
    layout: {
      left_aligned: 'items-start text-left',
      center_aligned: 'items-center text-center',
      right_aligned: 'items-end text-right',
    },
    textColor: {
      default: '',
      muted: 'opacity-70',
      primary: 'text-primary',
      secondary: 'text-secondary',
      accent: 'text-accent',
    },
  },
});

const preHeadingVariants = cva('mb-2 font-bold opacity-70', {
  variants: {
    headingSize: {
      extra_large: 'text-lg',
      large: 'text-base',
      medium: 'text-sm',
      small: 'text-xs',
    },
  },
});

const headingVariants = cva('leading-tight font-bold text-balance', {
  variants: {
    headingSize: {
      extra_large: 'text-5xl lg:text-6xl',
      large: 'text-4xl',
      medium: 'text-2xl',
      small: 'text-lg',
    },
  },
});

const Heading = ({
  className,
  heading,
  headingElement = 'h2',
  headingSize = 'large',
  layout = 'left_aligned',
  preHeading,
  textColor = 'default',
}) => {
  const Element = headingElement;
  return preHeading || heading ? (
    <div className={cn(containerVariants({ layout, textColor }), className)}>
      {preHeading && (
        <div className={preHeadingVariants({ headingSize })}>{preHeading}</div>
      )}
      {heading && (
        <Element className={headingVariants({ headingSize })}>{heading}</Element>
      )}
    </div>
  ) : null;
};

export default Heading;
