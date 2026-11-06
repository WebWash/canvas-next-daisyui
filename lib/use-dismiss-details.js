import { useEffect, useRef } from 'react';

/**
 * A <details> dropdown only closes when its own summary is clicked. This closes
 * the ones in the returned ref on an outside press, or on Escape.
 */
export function useDismissDetails() {
  const ref = useRef(null);

  useEffect(() => {
    const openDetails = () => {
      const root = ref.current;
      if (!root) {
        return [];
      }
      return [root, ...root.querySelectorAll('details')].filter((element) =>
        element.matches('details[open]'),
      );
    };

    const handlePointerDown = (event) => {
      openDetails().forEach((details) => {
        if (!details.contains(event.target)) {
          details.open = false;
        }
      });
    };

    const handleKeyDown = (event) => {
      const innermost = openDetails().at(-1);
      if (event.key === 'Escape' && innermost) {
        innermost.open = false;
        innermost.querySelector('summary')?.focus();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return ref;
}
