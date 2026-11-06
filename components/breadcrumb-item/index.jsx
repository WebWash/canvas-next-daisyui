import { cn } from 'drupal-canvas';

import { Icon } from '@/lib/icons';

/** Child of breadcrumbs. The root must be the <li>. */
const BreadcrumbItem = ({ label, link, icon = 'none', className }) => {
  return (
    <li className={cn('list-none', className)}>
      {link ? (
        <a href={link}>
          <Icon name={icon} />
          {label}
        </a>
      ) : (
        <span className="inline-flex items-center gap-2">
          <Icon name={icon} />
          {label}
        </span>
      )}
    </li>
  );
};

export default BreadcrumbItem;
