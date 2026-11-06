import { cn } from 'drupal-canvas';

import { Icon } from '@/lib/icons';

/**
 * CSS-only: daisyUI restyles the page when this checkbox is checked. The theme is
 * page-global, so instances aren't independent, and it resets on a full page load.
 */
const ThemeController = ({ variant = 'toggle', theme, label, className }) => {
  if (variant === 'swap') {
    return (
      <label className={cn('swap swap-rotate', className)}>
        <input type="checkbox" value={theme} className="theme-controller" />
        <span className="sr-only">{label}</span>
        <Icon name="sun" className="swap-off size-6" />
        <Icon name="moon" className="swap-on size-6" />
      </label>
    );
  }

  if (variant === 'checkbox') {
    return (
      <label className={cn('label cursor-pointer gap-2', className)}>
        <input
          type="checkbox"
          value={theme}
          className="checkbox theme-controller"
        />
        <span>{label}</span>
      </label>
    );
  }

  return (
    <label className={cn('flex cursor-pointer items-center gap-2', className)}>
      <Icon name="sun" className="size-4" />
      <input type="checkbox" value={theme} className="toggle theme-controller" />
      <span className="sr-only">{label}</span>
      <Icon name="moon" className="size-4" />
    </label>
  );
};

export default ThemeController;
