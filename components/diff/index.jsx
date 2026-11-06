import { cva } from 'class-variance-authority';
import { cn } from 'drupal-canvas';

import ImageBlock from '@/components/image';
import { sample, sampleImage } from '@/lib/sample';

const diffVariants = cva('diff w-full rounded-box', {
  variants: {
    aspectRatio: {
      '16_9': 'aspect-16/9',
      '4_3': 'aspect-4/3',
      '1_1': 'aspect-square',
    },
  },
  defaultVariants: {
    aspectRatio: '16_9',
  },
});

const Diff = ({ aspectRatio, item1, item2, className }) => {
  return (
    <figure className={cn(diffVariants({ aspectRatio }), className)}>
      <div className="diff-item-1">{sample(item1, () => <ImageBlock image={sampleImage('before', 800, 450, 'Before')} />)}</div>
      <div className="diff-item-2">{sample(item2, () => <ImageBlock image={sampleImage('after', 800, 450, 'After')} />)}</div>
      <div className="diff-resizer" />
    </figure>
  );
};

export default Diff;
