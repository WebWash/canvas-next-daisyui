import { cn } from 'drupal-canvas';

import Avatar from '@/components/avatar';
import { sample, sampleImage } from '@/lib/sample';

const AvatarGroup = ({ avatars, className }) => {
  return (
    <div className={cn('avatar-group min-h-12 min-w-12 -space-x-6', className)}>
      {sample(avatars, () => (
        <>
          <Avatar image={sampleImage('person-1', 200, 200, 'Person 1')} />
          <Avatar image={sampleImage('person-2', 200, 200, 'Person 2')} />
          <Avatar image={sampleImage('person-3', 200, 200, 'Person 3')} />
        </>
      ))}
    </div>
  );
};

export default AvatarGroup;
