import { cn } from 'drupal-canvas';

import { Icon } from '@/lib/icons';

/** Child of stats. The root must be the stat element. */
const Stat = ({ title, value, description, icon = 'none', actions, className }) => {
  return (
    <div className={cn('stat', className)}>
      {icon !== 'none' && (
        <div className="stat-figure text-secondary">
          <Icon name={icon} className="size-8" />
        </div>
      )}
      {title && <div className="stat-title">{title}</div>}
      <div className="stat-value">{value}</div>
      {description && <div className="stat-desc">{description}</div>}
      {actions && <div className="stat-actions">{actions}</div>}
    </div>
  );
};

export default Stat;
