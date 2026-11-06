import { cva } from 'class-variance-authority';
import { cn } from 'drupal-canvas';

import HoverGalleryItem from '@/components/hover-gallery-item';
import { sample, sampleImage } from '@/lib/sample';

const galleryVariants = cva('hover-gallery', {
  variants: {
    maxWidth: {
      xs: 'max-w-xs',
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
    },
  },
  defaultVariants: {
    maxWidth: 'sm',
  },
});

/** Maximum 10 images, all the same size. */
const HoverGallery = ({ maxWidth, images, className }) => {
  return (
    <figure className={cn(galleryVariants({ maxWidth }), className)}>
      {sample(images, () => (
        <>
          <HoverGalleryItem image={sampleImage('gallery-image-1', 400, 400, 'Gallery image 1')} />
          <HoverGalleryItem image={sampleImage('gallery-image-2', 400, 400, 'Gallery image 2')} />
          <HoverGalleryItem image={sampleImage('gallery-image-3', 400, 400, 'Gallery image 3')} />
          <HoverGalleryItem image={sampleImage('gallery-image-4', 400, 400, 'Gallery image 4')} />
        </>
      ))}
    </figure>
  );
};

export default HoverGallery;
