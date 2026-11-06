import { cn, Image } from 'drupal-canvas';

/** Child of list. The root must be the list-row item. */
const ListRow = ({ image, title, description, actions, className }) => {
  return (
    <li className={cn('list-row list-none', className)}>
      {image?.src && (
        <div>
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="size-10 rounded-box object-cover"
          />
        </div>
      )}
      <div className="list-col-grow">
        <div>{title}</div>
        {description && <div className="text-xs opacity-70">{description}</div>}
      </div>
      {actions && <div className="flex items-center gap-1">{actions}</div>}
    </li>
  );
};

export default ListRow;
