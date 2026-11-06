'use client';

import { cva } from 'class-variance-authority';
import { cn } from 'drupal-canvas';

import { JoinProvider } from '@/lib/control-context';
import Button from '@/components/button';
import { sample } from '@/lib/sample';

const joinVariants = cva('join', {
  variants: {
    direction: {
      horizontal: 'join-horizontal',
      vertical: 'join-vertical',
      responsive: 'join-vertical lg:join-horizontal',
    },
  },
});

/** button, input and select add join-item to themselves. Others aren't joined. */
const Join = ({ direction, items, className }) => {
  return (
    <div className={cn(joinVariants({ direction }), className)}>
      <JoinProvider>{sample(items, () => (
          <>
            <Button text="One" />
            <Button text="Two" />
            <Button text="Three" />
          </>
        ))}</JoinProvider>
    </div>
  );
};

export default Join;
