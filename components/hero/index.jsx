import { cva } from 'class-variance-authority';
import { cn, FormattedText, Image } from 'drupal-canvas';

import { sample } from '@/lib/sample';

const heroVariants = cva('hero', {
  variants: {
    minHeight: {
      auto: 'py-16',
      half: 'min-h-[50vh]',
      screen: 'min-h-screen',
    },
    hasImage: {
      true: 'relative overflow-hidden',
      false: 'bg-base-200 text-base-content',
    },
  },
  defaultVariants: {
    minHeight: 'auto',
    hasImage: false,
  },
});

const contentVariants = cva('hero-content', {
  variants: {
    variant: {
      default: '',
      image: '',
      split: 'flex-col',
    },
    alignment: {
      center: 'text-center',
      start: 'text-left',
    },
    reverse: {
      true: '',
      false: '',
    },
    overlay: {
      true: 'text-neutral-content',
      false: '',
    },
  },
  compoundVariants: [
    { variant: 'split', reverse: false, className: 'lg:flex-row' },
    { variant: 'split', reverse: true, className: 'lg:flex-row-reverse' },
  ],
  defaultVariants: {
    variant: 'default',
    alignment: 'center',
    reverse: false,
    overlay: false,
  },
});

const Hero = ({
  variant = 'default',
  heading,
  headingElement = 'h1',
  text,
  backgroundImage,
  overlay = false,
  minHeight,
  alignment = 'center',
  reverse = false,
  media,
  actions,
  className,
}) => {
  const Heading = headingElement;
  const sampledActions = sample(actions, () => (
    <button type="button" className="btn btn-primary">Get started</button>
  ));
  const hasImage = variant === 'image' && Boolean(backgroundImage?.src);
  const showOverlay = hasImage && overlay;

  return (
    <div className={cn(heroVariants({ minHeight, hasImage }), className)}>
      {hasImage && (
        <Image
          src={backgroundImage.src}
          alt={backgroundImage.alt}
          width={backgroundImage.width}
          height={backgroundImage.height}
          // Absolute, so that the min height sets the size and not the image.
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {showOverlay && <div className="hero-overlay" />}
      <div
        className={contentVariants({
          variant,
          alignment,
          reverse,
          overlay: showOverlay,
        })}
      >
        {media && (
          <div className="min-h-24 min-w-48 max-w-full lg:max-w-md">{media}</div>
        )}
        <div className="max-w-xl">
          {heading && (
            <Heading className="text-5xl font-bold text-balance">{heading}</Heading>
          )}
          {text && (
            <FormattedText className="prose prose-inherit max-w-none py-6">
              {text}
            </FormattedText>
          )}
          {sampledActions && (
            <div
              className={cn(
                'flex flex-wrap gap-2',
                alignment === 'center' && 'justify-center',
              )}
            >
              {sampledActions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
