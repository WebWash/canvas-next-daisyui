'use client';

import { cva } from 'class-variance-authority';
import { cn } from 'drupal-canvas';

import { useInJoin, useTooltipId } from '@/lib/control-context';
import { Icon } from '@/lib/icons';

const buttonVariants = cva('btn', {
  variants: {
    variant: {
      default: '',
      outline: 'btn-outline',
      dash: 'btn-dash',
      soft: 'btn-soft',
      ghost: 'btn-ghost',
      link: 'btn-link',
    },
    color: {
      default: '',
      neutral: 'btn-neutral',
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      accent: 'btn-accent',
      info: 'btn-info',
      success: 'btn-success',
      warning: 'btn-warning',
      error: 'btn-error',
    },
    size: {
      xs: 'btn-xs',
      sm: 'btn-sm',
      md: 'btn-md',
      lg: 'btn-lg',
      xl: 'btn-xl',
    },
    // w-fit stops a default button stretching inside a flex column or grid cell.
    shape: {
      default: 'w-fit',
      wide: 'btn-wide',
      block: 'btn-block',
      square: 'btn-square',
      circle: 'btn-circle',
    },
  },
  defaultVariants: {
    shape: 'default',
  },
});

const Button = ({
  variant,
  text,
  link,
  icon = 'none',
  iconPosition = 'start',
  color,
  size,
  shape,
  disabled = false,
  className,
}) => {
  const inJoin = useInJoin();
  const tooltipId = useTooltipId();

  const hasIcon = icon !== 'none';
  const iconOnly = hasIcon && (shape === 'square' || shape === 'circle');
  const Element = link ? 'a' : 'button';

  const elementProps = {
    className: cn(
      buttonVariants({ variant, color, size, shape }),
      inJoin && 'join-item',
      disabled && 'btn-disabled',
      className,
    ),
    'aria-describedby': tooltipId,
    'aria-label': iconOnly ? text : undefined,
  };

  if (link) {
    elementProps.href = disabled ? undefined : link;
  } else {
    elementProps.type = 'button';
  }
  if (disabled) {
    elementProps.tabIndex = -1;
    elementProps.role = 'button';
    elementProps['aria-disabled'] = true;
  }

  return (
    <Element {...elementProps}>
      {hasIcon && iconPosition === 'start' && <Icon name={icon} />}
      {!iconOnly && text}
      {hasIcon && iconPosition === 'end' && <Icon name={icon} />}
    </Element>
  );
};

export default Button;
