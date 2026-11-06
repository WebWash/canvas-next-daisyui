import { cn } from 'drupal-canvas';

import { sample } from '@/lib/sample';

const MockupWindow = ({ content, className }) => {
  return (
    <div
      className={cn(
        'mockup-window w-full border border-base-300 bg-base-100 text-base-content',
        className,
      )}
    >
      <div className="grid min-h-48 place-content-center border-t border-base-300 p-4">
        {sample(content, () => <p>Hello from the window.</p>)}
      </div>
    </div>
  );
};

export default MockupWindow;
