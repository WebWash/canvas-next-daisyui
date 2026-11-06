'use client';

import { cva } from 'class-variance-authority';
import { cn } from 'drupal-canvas';

import { useDomId } from '@/lib/dom-id';
import { GroupProvider } from '@/lib/group-context';
import TabPanel from '@/components/tab-panel';
import { sample } from '@/lib/sample';

const tabsVariants = cva('tabs', {
  variants: {
    variant: {
      default: '',
      box: 'tabs-box',
      border: 'tabs-border',
      lift: 'tabs-lift',
    },
    size: {
      xs: 'tabs-xs',
      sm: 'tabs-sm',
      md: 'tabs-md',
      lg: 'tabs-lg',
      xl: 'tabs-xl',
    },
    placement: {
      top: 'tabs-top',
      bottom: 'tabs-bottom',
    },
  },
});

/**
 * Native radio semantics, not the ARIA tabs pattern, because daisyUI needs panels
 * as siblings of the tabs. Set Open By Default on one panel, or nothing is shown.
 */
const Tabs = ({ variant, label, size, placement, panels, className }) => {
  const name = useDomId();

  return (
    <div
      role="group"
      aria-label={label}
      className={cn(tabsVariants({ variant, size, placement }), className)}
    >
      <GroupProvider name={name}>{sample(panels, () => (
        <>
          <TabPanel label="First" openByDefault content={<p>First panel.</p>} />
          <TabPanel label="Second" content={<p>Second panel.</p>} />
          <TabPanel label="Third" content={<p>Third panel.</p>} />
        </>
      ))}</GroupProvider>
    </div>
  );
};

export default Tabs;
