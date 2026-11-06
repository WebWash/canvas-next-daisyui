import { cn } from 'drupal-canvas';

import ImageBlock from '@/components/image';
import { sample, sampleImage } from '@/lib/sample';

/** Exactly nine direct children. No interactive content inside. */
const Hover3d = ({ link, content, className }) => {
  const Element = link ? 'a' : 'div';

  return (
    <Element
      href={link}
      className={cn('hover-3d w-fit max-w-full', className)}
    >
      <div className="flex flex-col empty:min-h-24 empty:min-w-48">{sample(content, () => (
        <ImageBlock image={sampleImage('card-placeholder', 400, 250, 'Card placeholder')} shape="rounded" />
      ))}</div>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </Element>
  );
};

export default Hover3d;
