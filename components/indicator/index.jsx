import { cva } from 'class-variance-authority';
import { cn } from 'drupal-canvas';

import { sample } from '@/lib/sample';

const itemVariants = cva('indicator-item badge', {
  variants: {
    horizontal: {
      end: 'indicator-end',
      center: 'indicator-center',
      start: 'indicator-start',
    },
    vertical: {
      top: 'indicator-top',
      middle: 'indicator-middle',
      bottom: 'indicator-bottom',
    },
    color: {
      default: '',
      neutral: 'badge-neutral',
      primary: 'badge-primary',
      secondary: 'badge-secondary',
      accent: 'badge-accent',
      info: 'badge-info',
      success: 'badge-success',
      warning: 'badge-warning',
      error: 'badge-error',
    },
  },
});

/** The indicator item comes before the content, per the daisyUI guide. */
const Indicator = ({ text, horizontal, vertical, color, content, className }) => {
  return (
    <div className={cn('indicator w-fit', className)}>
      <span className={itemVariants({ horizontal, vertical, color })}>{text}</span>
      <div className="flex flex-col empty:min-h-12 empty:min-w-24">
        {sample(content, () => (
          <button type="button" className="btn">
            Inbox
          </button>
        ))}
      </div>
    </div>
  );
};

export default Indicator;
