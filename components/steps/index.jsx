import { cva } from 'class-variance-authority';
import { cn } from 'drupal-canvas';

import Step from '@/components/step';
import { sample } from '@/lib/sample';

const stepsVariants = cva('steps max-w-full', {
  variants: {
    direction: {
      horizontal: 'steps-horizontal',
      vertical: 'steps-vertical',
      responsive: 'steps-vertical lg:steps-horizontal',
    },
  },
});

const Steps = ({ direction, items, className }) => {
  return (
    <ul className={cn(stepsVariants({ direction }), className)}>{sample(items, () => (
      <>
        <Step label="Register" color="primary" />
        <Step label="Choose plan" color="primary" />
        <Step label="Purchase" />
        <Step label="Receive" />
      </>
    ))}</ul>
  );
};

export default Steps;
