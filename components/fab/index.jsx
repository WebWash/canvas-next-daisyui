'use client';

import { cva } from 'class-variance-authority';
import { cn } from 'drupal-canvas';

import { GroupProvider } from '@/lib/group-context';
import { Icon } from '@/lib/icons';
import FabAction from '@/components/fab-action';
import { sample } from '@/lib/sample';

const fabVariants = cva('fab', {
  variants: {
    variant: {
      default: '',
      flower: 'fab-flower',
    },
  },
});

const triggerVariants = cva('btn btn-lg btn-circle', {
  variants: {
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
  },
});

/** Fixed to the viewport. Use once per page. */
const Fab = ({ variant, icon = 'plus', label, color, actions, className }) => {
  return (
    <div className={cn(fabVariants({ variant }), className)}>
      <div
        tabIndex={0}
        role="button"
        aria-label={label}
        className={triggerVariants({ color })}
      >
        <Icon name={icon} />
      </div>
      <GroupProvider options={{ fabFlower: variant === 'flower' }}>
        {sample(actions, () => (
          <>
            <FabAction label="Edit" icon="edit" />
            <FabAction label="Share" icon="share" />
            <FabAction label="Mail" icon="mail" link="/contact" />
          </>
        ))}
      </GroupProvider>
    </div>
  );
};

export default Fab;
