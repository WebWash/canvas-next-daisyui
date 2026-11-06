'use client';

import { cn } from 'drupal-canvas';

import { useInJoin } from '@/lib/control-context';
import { useDomId } from '@/lib/dom-id';

/**
 * Label structure, generated IDs, aria-describedby and validator placement for
 * input, select and textarea. `render` receives the props for the real control.
 *
 * - stacked: <label> above, classes on the control.
 * - inline: classes on a wrapping <label>, control is bare.
 * - floating: <label class="floating-label validator"> wraps the control, which
 *   keeps its own validator class, or its border won't change.
 * - inside a join: only the control, because join styles its direct children.
 */
export function Field({
  label,
  hideLabel,
  description,
  validationMessage,
  labelStyle = 'stacked',
  controlClass,
  className,
  render,
}) {
  const id = useDomId();
  const inJoin = useInJoin();

  if (inJoin) {
    return render({
      id,
      className: cn(controlClass, 'join-item', className),
      'aria-label': label,
    });
  }

  const validator = validationMessage ? 'validator' : undefined;
  const hintId = validationMessage ? `${id}-hint` : undefined;
  const descriptionId = description ? `${id}-description` : undefined;
  const describedBy = [hintId, descriptionId].filter(Boolean).join(' ');
  const controlProps = {
    id,
    'aria-describedby': describedBy || undefined,
  };

  let control;
  if (labelStyle === 'inline') {
    control = (
      <label className={cn(controlClass, validator)}>
        <span className={cn('label', hideLabel && 'sr-only')}>{label}</span>
        {render(controlProps)}
      </label>
    );
  } else if (labelStyle === 'floating') {
    control = (
      <label className={cn('floating-label', validator)}>
        {render({ ...controlProps, className: cn(controlClass, validator) })}
        <span className={hideLabel ? 'sr-only' : undefined}>{label}</span>
      </label>
    );
  } else {
    control = (
      <>
        <label htmlFor={id} className={cn('label', hideLabel && 'sr-only')}>
          {label}
        </label>
        {render({ ...controlProps, className: cn(controlClass, validator) })}
      </>
    );
  }

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {control}
      {validationMessage && (
        <p id={hintId} className="validator-hint mt-0 hidden">
          {validationMessage}
        </p>
      )}
      {description && (
        <p id={descriptionId} className="label whitespace-normal">
          {description}
        </p>
      )}
    </div>
  );
}

/** Checkbox and toggle: one control with its label beside it. */
export function CheckField({
  label,
  hideLabel,
  description,
  controlClass,
  className,
  name,
  required,
  disabled,
  checked,
}) {
  const id = useDomId();
  const descriptionId = description ? `${id}-description` : undefined;

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <label className="label w-fit cursor-pointer gap-2 whitespace-normal">
        <input
          id={id}
          type="checkbox"
          name={name}
          required={required}
          disabled={disabled}
          defaultChecked={checked}
          aria-describedby={descriptionId}
          className={controlClass}
        />
        <span className={hideLabel ? 'sr-only' : undefined}>{label}</span>
      </label>
      {description && (
        <p id={descriptionId} className="label whitespace-normal">
          {description}
        </p>
      )}
    </div>
  );
}

/** A visible or screen-reader-only label plus description around a group. */
export function FieldText({ label, hideLabel, descriptionId, description, children, className }) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {!hideLabel && (
        <span aria-hidden="true" className="label">
          {label}
        </span>
      )}
      {children}
      {description && (
        <p id={descriptionId} className="label whitespace-normal">
          {description}
        </p>
      )}
    </div>
  );
}
