'use client';

import { cn } from 'drupal-canvas';

import { useDomId } from '@/lib/dom-id';
import { FieldText } from '@/lib/field';

const Filter = ({
  label,
  hideLabel,
  description,
  name,
  required,
  disabled,
  options,
  className,
}) => {
  const id = useDomId();
  const descriptionId = description ? `${id}-description` : undefined;

  // cn() would delete the filter root class, so it stays outside. No option is
  // selected by default, per the daisyUI guide.
  return (
    <FieldText
      label={label}
      hideLabel={hideLabel}
      description={description}
      descriptionId={descriptionId}
      className={cn(className)}
    >
      <form
        aria-label={label}
        aria-describedby={descriptionId}
        // Visual only. Enter on a radio would otherwise submit and reload the page.
        onSubmit={(event) => event.preventDefault()}
        className="filter"
      >
        <input
          type="reset"
          value="×"
          aria-label="Clear"
          disabled={disabled}
          className="btn btn-square"
        />
        {(options ?? []).map((option) => (
          <input
            key={option}
            type="radio"
            name={name || id}
            value={option}
            aria-label={option}
            required={required}
            disabled={disabled}
            className="btn"
          />
        ))}
      </form>
    </FieldText>
  );
};

export default Filter;
