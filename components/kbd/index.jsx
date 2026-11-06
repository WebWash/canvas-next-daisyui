import { cva } from 'class-variance-authority';
import { cn } from 'drupal-canvas';

const kbdVariants = cva('kbd w-fit', {
  variants: {
    size: {
      xs: 'kbd-xs',
      sm: 'kbd-sm',
      md: 'kbd-md',
      lg: 'kbd-lg',
      xl: 'kbd-xl',
    },
  },
});

const Kbd = ({ text, size, className }) => {
  return <kbd className={cn(kbdVariants({ size }), className)}>{text}</kbd>;
};

export default Kbd;
