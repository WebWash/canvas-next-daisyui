import { cn } from 'drupal-canvas';

import { Icon } from '@/lib/icons';

/** Child of timeline. The root must be the <li>. */
const TimelineItem = ({
  startText,
  endText,
  icon = 'check',
  boxed = false,
  className,
}) => {
  const box = boxed ? 'timeline-box' : undefined;

  return (
    <li className={className}>
      <hr />
      {startText && <div className={cn('timeline-start', box)}>{startText}</div>}
      <div className="timeline-middle">
        <Icon name={icon} />
      </div>
      {endText && <div className={cn('timeline-end', box)}>{endText}</div>}
      <hr />
    </li>
  );
};

export default TimelineItem;
