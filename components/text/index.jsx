import { cva } from 'class-variance-authority';
import { cn, FormattedText } from 'drupal-canvas';

const colorVariants = cva('', {
  variants: {
    textColor: {
      default: '',
      muted: 'opacity-70',
      primary: 'text-primary',
      secondary: 'text-secondary',
      accent: 'text-accent',
    },
  },
});

const proseVariants = cva('prose prose-inherit max-w-none', {
  variants: {
    textSize: {
      extra_small: 'prose-sm text-xs',
      small: 'prose-sm',
      normal: 'prose-base',
      large: 'prose-lg',
      extra_large: 'prose-xl',
    },
  },
  defaultVariants: {
    textSize: 'normal',
  },
});

const Text = ({ text, textSize, textColor, className }) => {
  return (
    <div className={cn(colorVariants({ textColor }), className)}>
      <FormattedText className={proseVariants({ textSize })}>{text}</FormattedText>
    </div>
  );
};

export default Text;
