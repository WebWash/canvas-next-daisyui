'use client';

import { cva } from 'class-variance-authority';
import { cn } from 'drupal-canvas';

import { GroupProvider } from '@/lib/group-context';
import CarouselItem from '@/components/carousel-item';
import { sample, sampleImage } from '@/lib/sample';

const carouselVariants = cva('carousel max-w-full rounded-box', {
  variants: {
    alignment: {
      start: 'carousel-start',
      center: 'carousel-center',
      end: 'carousel-end',
    },
    direction: {
      horizontal: 'carousel-horizontal',
      vertical: 'carousel-vertical h-96',
    },
  },
  defaultVariants: {
    direction: 'horizontal',
  },
});

const Carousel = ({ alignment, direction, fullWidth = false, items, className }) => {
  return (
    <div className={cn(carouselVariants({ alignment, direction }), className)}>
      <GroupProvider options={{ carouselFullWidth: fullWidth }}>
        {sample(items, () => (
          <>
            <CarouselItem image={sampleImage('slide-1', 360, 240, 'Slide 1')} />
            <CarouselItem image={sampleImage('slide-2', 360, 240, 'Slide 2')} />
            <CarouselItem image={sampleImage('slide-3', 360, 240, 'Slide 3')} />
            <CarouselItem image={sampleImage('slide-4', 360, 240, 'Slide 4')} />
          </>
        ))}
      </GroupProvider>
    </div>
  );
};

export default Carousel;
