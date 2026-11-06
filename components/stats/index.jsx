import { cva } from 'class-variance-authority';
import { cn } from 'drupal-canvas';

import Stat from '@/components/stat';
import { sample } from '@/lib/sample';

const statsVariants = cva('stats max-w-full bg-base-100 text-base-content shadow', {
  variants: {
    direction: {
      horizontal: 'stats-horizontal',
      vertical: 'stats-vertical',
      responsive: 'stats-vertical lg:stats-horizontal',
    },
  },
});

const Stats = ({ direction, items, className }) => {
  return (
    <div className={cn(statsVariants({ direction }), className)}>{sample(items, () => (
      <>
        <Stat title="Downloads" value="31K" description="Jan 1st to Feb 1st" icon="download" />
        <Stat title="New users" value="4,200" description="Up 400 (22%)" icon="users" />
        <Stat title="Revenue" value="$1.2M" description="Down 90 (14%)" icon="star" />
      </>
    ))}</div>
  );
};

export default Stats;
