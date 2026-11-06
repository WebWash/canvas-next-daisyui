import { cva } from 'class-variance-authority';
import { cn } from 'drupal-canvas';

import TimelineItem from '@/components/timeline-item';
import { sample } from '@/lib/sample';

const timelineVariants = cva('timeline max-w-full', {
  variants: {
    direction: {
      vertical: 'timeline-vertical',
      horizontal: 'timeline-horizontal overflow-x-auto',
    },
    compact: {
      true: 'timeline-compact',
      false: '',
    },
    snapIcon: {
      true: 'timeline-snap-icon',
      false: '',
    },
  },
  defaultVariants: {
    direction: 'vertical',
    compact: false,
    snapIcon: false,
  },
});

const Timeline = ({ direction, compact, snapIcon, items, className }) => {
  return (
    <ul className={cn(timelineVariants({ direction, compact, snapIcon }), className)}>
      {sample(items, () => (
        <>
          <TimelineItem startText="1984" endText="First Mac" />
          <TimelineItem startText="1998" endText="iMac" />
          <TimelineItem startText="2007" endText="iPhone" />
        </>
      ))}
    </ul>
  );
};

export default Timeline;
