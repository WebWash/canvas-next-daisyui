import { cn } from 'drupal-canvas';

const prefixFor = (prefix, index) => {
  if (prefix === 'numbers') {
    return index + 1;
  }
  return prefix === 'dollar' ? '$' : undefined;
};

/** No syntax highlighting, which would need another library. */
const MockupCode = ({ lines, prefix = 'none', className }) => {
  return (
    <div
      className={cn(
        'mockup-code w-full bg-neutral text-neutral-content',
        className,
      )}
    >
      {(lines ?? []).map((line, index) => (
        <pre key={`${index}-${line}`} data-prefix={prefixFor(prefix, index)}>
          <code>{line}</code>
        </pre>
      ))}
    </div>
  );
};

export default MockupCode;
