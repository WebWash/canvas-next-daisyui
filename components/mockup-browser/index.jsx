import { cn } from 'drupal-canvas';

import { sample } from '@/lib/sample';

const MockupBrowser = ({ url, content, className }) => {
  return (
    <div
      className={cn(
        'mockup-browser w-full border border-base-300 bg-base-100 text-base-content',
        className,
      )}
    >
      <div className="mockup-browser-toolbar">
        {url && <div className="input">{url}</div>}
      </div>
      <div className="grid min-h-48 place-content-center border-t border-base-300 p-4">
        {sample(content, () => <p>Hello from the browser.</p>)}
      </div>
    </div>
  );
};

export default MockupBrowser;
