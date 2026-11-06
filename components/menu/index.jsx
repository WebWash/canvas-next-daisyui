import { cva } from 'class-variance-authority';
import { cn } from 'drupal-canvas';

import MenuItem from '@/components/menu-item';
import { sample } from '@/lib/sample';

const menuVariants = cva('menu rounded-box bg-base-200 text-base-content', {
  variants: {
    direction: {
      vertical: 'menu-vertical',
      horizontal: 'menu-horizontal',
      responsive: 'menu-vertical lg:menu-horizontal',
    },
    size: {
      xs: 'menu-xs',
      sm: 'menu-sm',
      md: 'menu-md',
      lg: 'menu-lg',
      xl: 'menu-xl',
    },
  },
});

const Menu = ({ direction, title, size, items, className }) => {
  return (
    <ul className={cn(menuVariants({ direction, size }), className)}>
      {title && <li className="menu-title">{title}</li>}
      {sample(items, () => (
        <>
          <MenuItem label="Home" link="/" icon="home" active />
          <MenuItem label="Pricing" link="/pricing" />
          <MenuItem label="Contact" link="/contact" />
        </>
      ))}
    </ul>
  );
};

export default Menu;
