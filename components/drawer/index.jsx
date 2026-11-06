'use client';

import { cva } from 'class-variance-authority';
import { cn } from 'drupal-canvas';
import { useRef } from 'react';

import Menu from '@/components/menu';
import MenuItem from '@/components/menu-item';
import { useDomId } from '@/lib/dom-id';
import { Icon } from '@/lib/icons';
import { sample } from '@/lib/sample';

// drawer-contained is in globals.css. It keeps the drawer inside its own box.
const drawerVariants = cva('drawer drawer-contained', {
  variants: {
    side: {
      start: '',
      end: 'drawer-end',
    },
    alwaysOpenOnLarge: {
      true: 'lg:drawer-open',
      false: '',
    },
  },
});

const LARGE = '(min-width: 64rem)';

const Drawer = ({
  side,
  alwaysOpenOnLarge = false,
  openByDefault = false,
  buttonText,
  closeText = 'Close',
  content,
  sidebar,
  className,
}) => {
  const id = useDomId();
  const toggleRef = useRef(null);
  const panelRef = useRef(null);

  // With alwaysOpenOnLarge the toggle is hidden at lg, so focus stays put there.
  const skipFocus = () =>
    alwaysOpenOnLarge && window.matchMedia(LARGE).matches;

  // daisyUI delays the panel's visibility by 100ms, and it can't take focus while
  // hidden, so keep trying for a short while.
  const focusPanel = (attempts = 12) => {
    const panel = panelRef.current;
    panel?.focus();
    if (panel && document.activeElement !== panel && attempts > 0) {
      setTimeout(() => focusPanel(attempts - 1), 50);
    }
  };

  const handleChange = (event) => {
    if (skipFocus()) {
      return;
    }
    if (event.target.checked) {
      focusPanel();
    } else {
      toggleRef.current?.focus();
    }
  };

  const close = () => {
    if (toggleRef.current?.checked) {
      toggleRef.current.click();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape' && !skipFocus()) {
      close();
    }
  };

  return (
    <div
      onKeyDown={handleKeyDown}
      className={cn(drawerVariants({ side, alwaysOpenOnLarge }), className)}
    >
      <input
        ref={toggleRef}
        id={id}
        type="checkbox"
        aria-label={buttonText}
        defaultChecked={openByDefault}
        onChange={handleChange}
        className="drawer-toggle"
      />
      <div className="drawer-content flex min-w-0 flex-col gap-4 p-4">
        <label
          htmlFor={id}
          className={cn(
            'btn drawer-button w-fit',
            alwaysOpenOnLarge && 'lg:hidden',
          )}
        >
          {buttonText}
        </label>
        {sample(content, () => <p>Main content beside the drawer.</p>)}
      </div>
      <div className="drawer-side">
        <label htmlFor={id} aria-label={closeText} className="drawer-overlay" />
        <div
          ref={panelRef}
          tabIndex={-1}
          className="flex min-h-full w-64 max-w-full flex-col gap-2 bg-base-200 p-4 text-base-content"
        >
          <button
            type="button"
            onClick={close}
            className={cn(
              'btn btn-ghost btn-sm w-fit self-end',
              alwaysOpenOnLarge && 'lg:hidden',
            )}
          >
            <Icon name="close" />
            {closeText}
          </button>
          {sample(sidebar, () => (
            <Menu
              className="w-full bg-transparent p-0"
              items={
                <>
                  <MenuItem label="Home" link="/" icon="home" />
                  <MenuItem label="Pricing" link="/pricing" />
                  <MenuItem label="Contact" link="/contact" />
                </>
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
