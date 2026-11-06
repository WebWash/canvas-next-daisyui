import { cn } from 'drupal-canvas';

import { Icon } from '@/lib/icons';

/** Child of dock. */
const DockItem = ({ label, icon = 'home', link, active = false, className }) => {
  const Element = link ? 'a' : 'button';

  return (
    <Element
      href={link}
      type={link ? undefined : 'button'}
      aria-current={active ? 'page' : undefined}
      className={cn(active && 'dock-active', className)}
    >
      <Icon name={icon} />
      <span className="dock-label">{label}</span>
    </Element>
  );
};

export default DockItem;
