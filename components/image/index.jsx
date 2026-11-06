import { cva } from 'class-variance-authority';
import { cn, Image as ResponsiveImage } from 'drupal-canvas';

// diff and stack size their direct children, so full width stands aside there.
const imageVariants = cva('not-in-[.diff,.stack]:w-full', {
  variants: {
    shape: {
      none: '',
      rounded: 'rounded-box',
      squircle: 'mask mask-squircle',
      heart: 'mask mask-heart',
      hexagon: 'mask mask-hexagon',
      hexagon_2: 'mask mask-hexagon-2',
      decagon: 'mask mask-decagon',
      pentagon: 'mask mask-pentagon',
      diamond: 'mask mask-diamond',
      circle: 'mask mask-circle',
      star: 'mask mask-star',
      star_2: 'mask mask-star-2',
      triangle: 'mask mask-triangle',
      triangle_2: 'mask mask-triangle-2',
      triangle_3: 'mask mask-triangle-3',
      triangle_4: 'mask mask-triangle-4',
    },
    maxWidth: {
      none: '',
      xs: 'max-w-xs',
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
    },
  },
  defaultVariants: {
    shape: 'none',
    maxWidth: 'none',
  },
});

const Image = ({ image, shape, maxWidth, className }) => {
  if (!image?.src) {
    return null;
  }

  const { src, alt, width, height } = image;

  return (
    <ResponsiveImage
      {...{ src, alt, width, height }}
      className={cn(imageVariants({ shape, maxWidth }), className)}
    />
  );
};

export default Image;
