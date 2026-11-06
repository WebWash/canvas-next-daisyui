'use client';

import { cva } from 'class-variance-authority';
import { cn } from 'drupal-canvas';

import Button from '@/components/button';
import { Icon } from '@/lib/icons';
import { sample } from '@/lib/sample';
import { NAV_LINKS } from '@/lib/site-links';
import { useDismissDetails } from '@/lib/use-dismiss-details';

const navbarVariants = cva('navbar shadow-sm', {
  variants: {
    background: {
      base_100: 'bg-base-100 text-base-content',
      base_200: 'bg-base-200 text-base-content',
      neutral: 'bg-neutral text-neutral-content',
    },
    sticky: {
      true: 'sticky top-0 z-30',
      false: '',
    },
  },
  defaultVariants: {
    background: 'base_100',
    sticky: false,
  },
});

const POPUP = 'rounded-box bg-base-100 text-base-content';

/** One helper for both menus. The data is rendered twice, which is safe. */
const NavItem = ({ link, horizontal }) => {
  if (!link.children?.length) {
    return (
      <li>
        <a href={link.url}>{link.label}</a>
      </li>
    );
  }

  const items = link.children.map((child) => (
    <NavItem key={child.id} link={child} horizontal={horizontal} />
  ));

  if (horizontal) {
    return (
      <li>
        <details>
          <summary>{link.label}</summary>
          <ul className={cn(POPUP, 'z-10 w-52 p-2 shadow')}>{items}</ul>
        </details>
      </li>
    );
  }

  return (
    <li>
      <a href={link.url}>{link.label}</a>
      <ul>{items}</ul>
    </li>
  );
};

const Navbar = ({
  background,
  sticky,
  links = NAV_LINKS,
  start,
  end,
  className,
}) => {
  const ref = useDismissDetails();

  return (
    <header
      ref={ref}
      className={cn(navbarVariants({ background, sticky }), className)}
    >
      <div className="navbar-start">
        {links.length > 0 && (
          <details className="dropdown lg:hidden">
            <summary className="btn btn-ghost" aria-label="Open menu">
              <Icon name="menu" />
            </summary>
            <nav aria-label="Main">
              <ul
                className={cn(
                  POPUP,
                  'menu menu-sm dropdown-content z-10 mt-3 w-52 p-2 shadow',
                )}
              >
                {links.map((link) => (
                  <NavItem key={link.id} link={link} />
                ))}
              </ul>
            </nav>
          </details>
        )}
        <div className="min-w-24">
          {sample(start, () => (
            <Button text="Company" link="/" variant="ghost" size="lg" />
          ))}
        </div>
      </div>
      <nav className="navbar-center hidden lg:flex" aria-label="Main">
        <ul className="menu menu-horizontal px-1">
          {links.map((link) => (
            <NavItem key={link.id} link={link} horizontal />
          ))}
        </ul>
      </nav>
      <div className="navbar-end min-w-24 gap-2">
        {sample(end, () => (
          <Button text="Contact us" link="/contact" color="primary" />
        ))}
      </div>
    </header>
  );
};

export default Navbar;
