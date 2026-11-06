import { cva } from 'class-variance-authority';
import { cn } from 'drupal-canvas';

import { sample } from '@/lib/sample';

const collapseVariants = cva('bg-base-100 text-base-content', {
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
  defaultVariants: {
    indicator: 'arrow',
    bordered: false,
  },
});

const Collapse = ({
  title,
  indicator,
  bordered,
  openByDefault = false,
  content,
  className,
}) => {
  // cn() would delete the collapse root class, so it stays outside.
  return (
    <details
      open={openByDefault || undefined}
      className={`collapse ${cn(collapseVariants({ indicator, bordered }), className)}`}
    >
      <summary className="collapse-title font-semibold">{title}</summary>
      <div className="collapse-content">{sample(content, () => <p>Here is the rest of the content.</p>)}</div>
    </details>
  );
};

export default Collapse;
