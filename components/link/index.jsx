'use client';

import { cva } from 'class-variance-authority';
import { cn } from 'drupal-canvas';

import { useTooltipId } from '@/lib/control-context';

const linkVariants = cva('link w-fit', {
  variants: {
    variant: {
      default: '',
      hover: 'link-hover',
    },
    color: {
      default: '',
      neutral: 'link-neutral',
      primary: 'link-primary',
      secondary: 'link-secondary',
      accent: 'link-accent',
      info: 'link-info',
      success: 'link-success',
      warning: 'link-warning',
      error: 'link-error',
    },
  },
});

const Link = ({ variant, text, link, color, className }) => {
  const tooltipId = useTooltipId();

  return (
    <a
      href={link}
      aria-describedby={tooltipId}
      className={cn(linkVariants({ variant, color }), className)}
    >
      {text}
    </a>
  );
};

export default Link;
