'use client';

import { cn, Image } from 'drupal-canvas';

import { useGroupOptions } from '@/lib/group-context';

/** Child of carousel. */
const CarouselItem = ({ image, content, className }) => {
  const { carouselFullWidth } = useGroupOptions();

  return (
    <div className={cn('carousel-item', carouselFullWidth && 'w-full', className)}>
      {image?.src && (
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className={carouselFullWidth ? 'w-full object-cover' : undefined}
        />
      )}
      {content}
    </div>
  );
};

export default CarouselItem;
