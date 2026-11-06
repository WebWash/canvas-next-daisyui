'use client';

import { cva } from 'class-variance-authority';
import { cn } from 'drupal-canvas';

import { TooltipProvider } from '@/lib/control-context';
import { useDomId } from '@/lib/dom-id';
import Button from '@/components/button';
import { sample } from '@/lib/sample';

// Not the shared colour list: daisyUI has no tooltip-neutral.
const tooltipVariants = cva('tooltip w-fit', {
  variants: {
    placement: {
      top: 'tooltip-top',
      bottom: 'tooltip-bottom',
      left: 'tooltip-left',
      right: 'tooltip-right',
    },
    alignment: {
      center: 'tooltip-center',
      start: 'tooltip-start',
      end: 'tooltip-end',
    },
    color: {
      default: '',
      primary: 'tooltip-primary',
      secondary: 'tooltip-secondary',
      accent: 'tooltip-accent',
      info: 'tooltip-info',
      success: 'tooltip-success',
      warning: 'tooltip-warning',
      error: 'tooltip-error',
    },
  },
});

/**
 * Only button and link read the context and add aria-describedby. Other triggers
 * get the visual tooltip only, so it must not carry essential information.
 */
const Tooltip = ({
  text,
  placement,
  alignment,
  color,
  openByDefault = false,
  content,
  className,
}) => {
  const id = useDomId();

  return (
    <div
      className={cn(
        tooltipVariants({ placement, alignment, color }),
        openByDefault && 'tooltip-open',
        className,
      )}
    >
      <div id={id} role="tooltip" className="tooltip-content">
        {text}
      </div>
      <TooltipProvider id={id}>{sample(content, () => <Button text="Hover me" />)}</TooltipProvider>
    </div>
  );
};

export default Tooltip;
