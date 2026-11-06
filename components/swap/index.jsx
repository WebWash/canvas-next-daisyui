import { cva } from 'class-variance-authority';
import { cn } from 'drupal-canvas';

import { Icon } from '@/lib/icons';

const swapVariants = cva('swap w-fit', {
  variants: {
    variant: {
      default: '',
      rotate: 'swap-rotate',
      flip: 'swap-flip',
    },
  },
});

const Face = ({ icon, text, className }) => (
  <div className={className}>
    {icon !== 'none' && <Icon name={icon} className="size-8" />}
    {text}
  </div>
);

const Swap = ({
  variant,
  onIcon = 'none',
  offIcon = 'none',
  onText,
  offText,
  label,
  className,
}) => {
  return (
    <label className={cn(swapVariants({ variant }), className)}>
      <input type="checkbox" aria-label={label} />
      <Face icon={onIcon} text={onText} className="swap-on" />
      <Face icon={offIcon} text={offText} className="swap-off" />
    </label>
  );
};

export default Swap;
