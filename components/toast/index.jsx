'use client';

import { cva } from 'class-variance-authority';
import { cn } from 'drupal-canvas';
import { useEffect, useState } from 'react';

import Alert from '@/components/alert';
import { sample } from '@/lib/sample';

const toastVariants = cva('toast z-30', {
  variants: {
    horizontal: {
      start: 'toast-start',
      center: 'toast-center',
      end: 'toast-end',
    },
    vertical: {
      top: 'toast-top',
      middle: 'toast-middle',
      bottom: 'toast-bottom',
    },
  },
});

/** Fixed to the viewport. Use once per page. 0 seconds never hides it. */
const Toast = ({
  horizontal,
  vertical,
  autoHideSeconds = 0,
  content,
  className,
}) => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!autoHideSeconds) {
      setHidden(false);
      return undefined;
    }
    const timer = setTimeout(() => setHidden(true), autoHideSeconds * 1000);
    return () => clearTimeout(timer);
  }, [autoHideSeconds]);

  if (hidden) {
    return null;
  }

  return (
    <div
      aria-live="polite"
      className={cn(toastVariants({ horizontal, vertical }), className)}
    >
      {sample(content, () => <Alert text="Message sent." color="success" icon="success" />)}
    </div>
  );
};

export default Toast;
