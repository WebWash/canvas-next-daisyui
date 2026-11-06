import { cn } from 'drupal-canvas';

import { sample } from '@/lib/sample';

const MockupPhone = ({ content, className }) => {
  return (
    <div className={cn('mockup-phone w-fit max-w-full', className)}>
      <div className="mockup-phone-camera" />
      <div className="mockup-phone-display grid place-content-center bg-base-100 p-6 text-base-content">
        {sample(content, () => <p>Hello from the phone.</p>)}
      </div>
    </div>
  );
};

export default MockupPhone;
