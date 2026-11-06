'use client';

import { cva } from 'class-variance-authority';
import { cn } from 'drupal-canvas';

import Menu from '@/components/menu';
import MenuItem from '@/components/menu-item';
import { sample } from '@/lib/sample';
import { useDismissDetails } from '@/lib/use-dismiss-details';

const dropdownVariants = cva('dropdown w-fit', {
  variants: {
    placement: {
      bottom: 'dropdown-bottom',
      top: 'dropdown-top',
      left: 'dropdown-left',
      right: 'dropdown-right',
    },
    alignment: {
      start: 'dropdown-start',
      center: 'dropdown-center',
      end: 'dropdown-end',
    },
  },
});

const buttonVariants = cva('btn', {
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

/** A menu in the panel drops its own surface, because the panel already has one. */
const Dropdown = ({
  buttonText,
  placement,
  alignment,
  color,
  openByDefault = false,
  content,
  className,
}) => {
  const ref = useDismissDetails();

  return (
    <details
      ref={ref}
      className={cn(dropdownVariants({ placement, alignment }), className)}
      open={openByDefault || undefined}
    >
      <summary className={buttonVariants({ color })}>{buttonText}</summary>
      <div className="dropdown-content z-10 m-1 min-h-12 w-max max-w-xs min-w-52 rounded-box border border-base-300 bg-base-100 p-2 text-base-content shadow-sm [&_.menu]:w-full [&_.menu]:bg-transparent [&_.menu]:p-0">
        {sample(content, () => (
          <Menu
            items={
              <>
                <MenuItem label="Profile" link="/profile" icon="user" />
                <MenuItem label="Settings" link="/settings" icon="settings" />
                <MenuItem label="Sign out" link="/sign-out" icon="arrow_right" />
              </>
            }
          />
        ))}
      </div>
    </details>
  );
};

export default Dropdown;
