'use client';

import { cva } from 'class-variance-authority';
import { cn } from 'drupal-canvas';
import { useEffect, useRef } from 'react';

import { useDomId } from '@/lib/dom-id';
import { sample } from '@/lib/sample';

const modalVariants = cva('modal', {
  variants: {
    placement: {
      middle: 'modal-middle',
      top: 'modal-top',
      bottom: 'modal-bottom',
      start: 'modal-start',
      end: 'modal-end',
    },
  },
});

/**
 * Visibility comes only from native dialog state, which supplies focus, Escape
 * and focus return. Never add modal-open: it stays visible on a closed dialog.
 */
const Modal = ({
  buttonText,
  heading,
  placement,
  closeText = 'Close',
  openByDefault = false,
  content,
  actions,
  className,
}) => {
  const dialogRef = useRef(null);
  const headingId = useDomId();

  useEffect(() => {
    if (openByDefault && dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }, [openByDefault]);

  // Workbench's sandboxed preview blocks <form method="dialog"> submission, so
  // the controls close the dialog directly. The form stays for daisyUI's styles.
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        className="btn w-fit"
        onClick={() => dialogRef.current?.showModal()}
      >
        {buttonText}
      </button>
      <dialog
        ref={dialogRef}
        aria-labelledby={headingId}
        className={cn(modalVariants({ placement }), className)}
      >
        <div className="modal-box text-base-content">
          <h3 id={headingId} className="text-lg font-bold">
            {heading}
          </h3>
          <div className="min-h-6 py-4">{sample(content, () => <p>Press Close or Escape, or click outside this dialog.</p>)}</div>
          <div className="modal-action">
            {actions}
            <button type="button" className="btn" onClick={close}>
              {closeText}
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button type="button" aria-label={closeText} onClick={close}>
            {closeText}
          </button>
        </form>
      </dialog>
    </>
  );
};

export default Modal;
