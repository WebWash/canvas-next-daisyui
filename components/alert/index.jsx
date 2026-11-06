import { cva } from 'class-variance-authority';
import { cn } from 'drupal-canvas';

import { Icon } from '@/lib/icons';

const alertVariants = cva('alert', {
  variants: {
    variant: {
      default: '',
      outline: 'alert-outline',
      dash: 'alert-dash',
      soft: 'alert-soft',
    },
    color: {
      default: '',
      info: 'alert-info',
      success: 'alert-success',
      warning: 'alert-warning',
      error: 'alert-error',
    },
    direction: {
      horizontal: 'alert-horizontal',
      vertical: 'alert-vertical',
      responsive: 'alert-vertical sm:alert-horizontal',
    },
  },
});

const Alert = ({
  variant,
  heading,
  text,
  icon = 'none',
  color,
  direction,
  actions,
  className,
}) => {
  return (
    <div
      role="alert"
      className={cn(alertVariants({ variant, color, direction }), className)}
    >
      <Icon name={icon} className="size-6 shrink-0" />
      <div>
        {heading && <h3 className="font-bold">{heading}</h3>}
        <div className={heading ? 'text-sm' : undefined}>{text}</div>
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
};

export default Alert;
