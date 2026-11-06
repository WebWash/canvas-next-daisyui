'use client';

import { cva } from 'class-variance-authority';
import { cn } from 'drupal-canvas';

import { useGroupOptions } from '@/lib/group-context';
import { sample } from '@/lib/sample';

const itemVariants = cva('bg-base-100 text-base-content', {
  variants: {
    indicator: {
      arrow: 'collapse-arrow',
      plus: 'collapse-plus',
      none: '',
    },
    bordered: {
      true: 'border border-base-300',
      false: '',
    },
  },
});

/** Child of accordion. Set Open By Default on at most one item in a group. */
const AccordionItem = ({ title, openByDefault = false, content, className }) => {
  const { name, accordionIndicator, accordionBordered } = useGroupOptions();

  // cn() would delete the collapse root class, so it stays outside.
  return (
    <details
      name={name}
      open={openByDefault || undefined}
      className={`collapse ${cn(
        itemVariants({
          indicator: accordionIndicator ?? 'arrow',
          bordered: accordionBordered ?? false,
        }),
        className,
      )}`}
    >
      <summary className="collapse-title font-semibold">{title}</summary>
      <div className="collapse-content">{sample(content, () => <p>A component library for Tailwind CSS.</p>)}</div>
    </details>
  );
};

export default AccordionItem;
