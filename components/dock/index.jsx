import { cva } from 'class-variance-authority';
import { cn } from 'drupal-canvas';

import DockItem from '@/components/dock-item';
import { sample } from '@/lib/sample';

const dockVariants = cva('dock z-30', {
  variants: {
    size: {
      xs: 'dock-xs',
      sm: 'dock-sm',
      md: 'dock-md',
      lg: 'dock-lg',
      xl: 'dock-xl',
    },
  },
});

/** Fixed to the viewport. Use once per page. */
const Dock = ({ size, items, className }) => {
  return (
    <nav aria-label="Dock" className={cn(dockVariants({ size }), className)}>
      {sample(items, () => (
        <>
          <DockItem label="Home" icon="home" link="/" active />
          <DockItem label="Inbox" icon="mail" link="/inbox" />
          <DockItem label="Settings" icon="settings" />
        </>
      ))}
    </nav>
  );
};

export default Dock;
