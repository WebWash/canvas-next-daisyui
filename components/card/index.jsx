import { cva } from 'class-variance-authority';
import { cn, FormattedText, Image } from 'drupal-canvas';

import { sample } from '@/lib/sample';

const cardVariants = cva('card bg-base-100 text-base-content shadow-sm', {
  variants: {
    variant: {
      default: '',
      // No shadow, or it hides the border that makes these variants different.
      border: 'card-border border-base-300 shadow-none',
      dash: 'card-dash border-base-300 shadow-none',
    },
    imagePosition: {
      top: '',
      bottom: '',
      side: 'card-side [&>figure]:max-w-2/5',
      responsive_side: 'sm:card-side sm:[&>figure]:max-w-2/5',
      overlay: 'image-full',
    },
    size: {
      xs: 'card-xs',
      sm: 'card-sm',
      md: 'card-md',
      lg: 'card-lg',
      xl: 'card-xl',
    },
  },
});

const Card = ({
  variant,
  title,
  titleElement = 'h2',
  text,
  image,
  imagePosition = 'top',
  size,
  content,
  actions,
  className,
}) => {
  const Title = titleElement;
  const sampledActions = sample(actions, () => (
    <button type="button" className="btn btn-primary">Read more</button>
  ));
  const figure = image?.src ? (
    <figure>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className="h-full w-full object-cover"
      />
    </figure>
  ) : null;

  return (
    <div className={cn(cardVariants({ variant, imagePosition, size }), className)}>
      {imagePosition !== 'bottom' && figure}
      <div className="card-body">
        {title && <Title className="card-title">{title}</Title>}
        {text && (
          <FormattedText className="prose prose-inherit max-w-none">
            {text}
          </FormattedText>
        )}
        {content}
        {sampledActions && (
          <div className="card-actions mt-auto justify-end">{sampledActions}</div>
        )}
      </div>
      {imagePosition === 'bottom' && figure}
    </div>
  );
};

export default Card;
