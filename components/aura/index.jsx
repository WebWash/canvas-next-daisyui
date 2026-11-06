import { cva } from 'class-variance-authority';
import { cn } from 'drupal-canvas';

import { sample } from '@/lib/sample';

// daisyUI picks the radius with :has(>.btn), which the slot wrapper hides from it.
const auraVariants = cva(
  'aura w-fit [&:has(>div>.btn,>div>.input,>div>.select)]:[--aura-radius:var(--radius-field)] [&:has(>div>.checkbox,>div>.toggle,>div>.badge)]:[--aura-radius:var(--radius-selector)]',
  {
    variants: {
      variant: {
        default: '',
        dual: 'aura-dual',
        rainbow: 'aura-rainbow',
        holo: 'aura-holo',
        gold: 'aura-gold',
        silver: 'aura-silver',
        glow: 'aura-glow',
      },
      size: {
        xs: 'aura-xs',
        sm: 'aura-sm',
        md: 'aura-md',
        lg: 'aura-lg',
        xl: 'aura-xl',
      },
      color: {
        default: '',
        neutral: 'text-neutral',
        primary: 'text-primary',
        secondary: 'text-secondary',
        accent: 'text-accent',
        info: 'text-info',
        success: 'text-success',
        warning: 'text-warning',
        error: 'text-error',
      },
    },
  },
);

/**
 * An aura needs one direct child, so the slot gets a wrapper. It must match the
 * size of its content, or the light effect traces empty space. Use once per page.
 */
const Aura = ({ variant, size, color, content, className }) => {
  return (
    <div className={cn(auraVariants({ variant, size, color }), className)}>
      <div className="flex flex-col text-base-content empty:min-h-12 empty:min-w-24">
        {sample(content, () => (
          <button type="button" className="btn">
            Get started
          </button>
        ))}
      </div>
    </div>
  );
};

export default Aura;
