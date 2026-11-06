import { cn } from 'drupal-canvas';

import { Icon } from '@/lib/icons';

/** Child of menu. The root must be the <li>. */
const MenuItem = ({
  label,
  link,
  icon = 'none',
  active = false,
  disabled = false,
  isTitle = false,
  collapsible = false,
  submenu,
  className,
}) => {
  const face = (
    <>
      <Icon name={icon} />
      {label}
    </>
  );

  if (isTitle) {
    return (
      <li className={cn('list-none', className)}>
        <h2 className="menu-title">{face}</h2>
        {submenu && <ul>{submenu}</ul>}
      </li>
    );
  }

  if (collapsible) {
    return (
      <li className={cn('list-none', disabled && 'menu-disabled', className)}>
        <details>
          <summary>{face}</summary>
          <ul>{submenu}</ul>
        </details>
      </li>
    );
  }

  const Element = link && !disabled ? 'a' : 'button';

  return (
    <li className={cn('list-none', disabled && 'menu-disabled', className)}>
      <Element
        href={Element === 'a' ? link : undefined}
        type={Element === 'a' ? undefined : 'button'}
        disabled={disabled || undefined}
        aria-current={active ? 'page' : undefined}
        className={active ? 'menu-active' : undefined}
      >
        {face}
      </Element>
      {submenu && <ul>{submenu}</ul>}
    </li>
  );
};

export default MenuItem;
