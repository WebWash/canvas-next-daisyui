'use client';

import { cn } from 'drupal-canvas';

import { useDomId } from '@/lib/dom-id';
import Checkbox from '@/components/checkbox';
import Input from '@/components/input';
import { sample } from '@/lib/sample';

const Fieldset = ({ legend, description, content, className }) => {
  const id = useDomId();

  return (
    <fieldset
      aria-describedby={description ? id : undefined}
      className={cn('fieldset min-w-0', className)}
    >
      <legend className="fieldset-legend">{legend}</legend>
      {sample(content, () => (
        <>
          <Input label="Name" />
          <Input label="Email" type="email" />
          <Checkbox label="Send me updates" />
        </>
      ))}
      {description && (
        <p id={id} className="label whitespace-normal">
          {description}
        </p>
      )}
    </fieldset>
  );
};

export default Fieldset;
