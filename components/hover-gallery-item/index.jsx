import { Image } from 'drupal-canvas';

/** Child of hover-gallery. The root must be the <img>. */
const HoverGalleryItem = ({ image, className }) => {
  if (!image?.src) {
    return null;
  }

  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      className={className}
    />
  );
};

export default HoverGalleryItem;
