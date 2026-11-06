'use client';

import { cva } from 'class-variance-authority';
import { cn } from 'drupal-canvas';

import MegamenuItem from '@/components/megamenu-item';
import { useDomId } from '@/lib/dom-id';
import { GroupProvider } from '@/lib/group-context';
import { sample } from '@/lib/sample';

const megamenuVariants = cva(
  'megamenu max-sm:megamenu-vertical border border-base-300 p-2',
  {
    variants: {
      width: {
        // These panels open from the button, so they'd overlap the bar's padding
        // and could run off a narrow screen. Wide and full open from the bar.
        default:
          'sm:[&>[popover]]:mt-3 sm:[&>[popover]]:max-w-[calc(100dvw-2rem)]',
        wide: 'megamenu-wide w-full',
        full: 'megamenu-full w-full',
      },
      size: {
        xs: 'megamenu-xs',
        sm: 'megamenu-sm',
        md: 'megamenu-md',
        lg: 'megamenu-lg',
        xl: 'megamenu-xl',
      },
    },
    defaultVariants: {
      width: 'default',
    },
  },
);

/**
 * Maximum 10 panels. Panels are closed popovers, so their slots are hard to reach
 * in the Canvas editor. On small screens the button opens a vertical menu.
 */
const Megamenu = ({ width, size, buttonText = 'Menu', items, className }) => {
  const id = useDomId();

  return (
    <>
      <button type="button" className="btn w-fit sm:hidden" popoverTarget={id}>
        {buttonText}
      </button>
      <div
        id={id}
        popover="auto"
        className={cn(megamenuVariants({ width, size }), className)}
      >
        <span className="megamenu-active" />
        <GroupProvider options={{ inMegamenu: true }}>
          {sample(items, () => (
            <>
              <MegamenuItem label="Products" />
              <MegamenuItem label="Solutions" />
              <MegamenuItem label="Resources" />
            </>
          ))}
        </GroupProvider>
      </div>
    </>
  );
};

export default Megamenu;
