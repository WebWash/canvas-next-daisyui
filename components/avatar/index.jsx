import { cva } from 'class-variance-authority';
import { cn, Image } from 'drupal-canvas';

const avatarVariants = cva('avatar w-fit', {
  variants: {
    status: {
      none: '',
      online: 'avatar-online',
      offline: 'avatar-offline',
    },
  },
});

const frameVariants = cva('', {
  variants: {
    size: {
      xs: 'w-8',
      sm: 'w-12',
      md: 'w-16',
      lg: 'w-24',
      xl: 'w-32',
    },
    shape: {
      circle: 'rounded-full',
      rounded: 'rounded-box',
      squircle: 'mask mask-squircle',
      hexagon: 'mask mask-hexagon',
      triangle: 'mask mask-triangle',
    },
  },
  defaultVariants: {
    size: 'md',
    shape: 'circle',
  },
});

const Avatar = ({ image, placeholderText, size, shape, status, className }) => {
  const hasImage = Boolean(image?.src);

  return (
    <div
      className={cn(
        avatarVariants({ status }),
        !hasImage && 'avatar-placeholder',
        className,
      )}
    >
      <div
        className={cn(
          frameVariants({ size, shape }),
          !hasImage && 'bg-neutral text-neutral-content',
        )}
      >
        {hasImage ? (
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
          />
        ) : (
          <span>{placeholderText}</span>
        )}
      </div>
    </div>
  );
};

export default Avatar;
