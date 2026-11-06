import { cn } from 'drupal-canvas';

import ListRow from '@/components/list-row';
import { sample, sampleImage } from '@/lib/sample';

const List = ({ rows, className }) => {
  return (
    <ul
      className={cn(
        'list min-h-12 rounded-box bg-base-100 text-base-content shadow-md',
        className,
      )}
    >
      {sample(rows, () => (
        <>
          <ListRow title="Song 1" description="An artist name" image={sampleImage('cover-1', 100, 100, 'Cover 1')} />
          <ListRow title="Song 2" description="An artist name" image={sampleImage('cover-2', 100, 100, 'Cover 2')} />
          <ListRow title="Song 3" description="An artist name" image={sampleImage('cover-3', 100, 100, 'Cover 3')} />
        </>
      ))}
    </ul>
  );
};

export default List;
