import { cva } from 'class-variance-authority';
import { cn } from 'drupal-canvas';

const rotateVariants = cva('w-fit', {
  variants: {
    textSize: {
      base: 'text-base',
      xl: 'text-xl',
      '3xl': 'text-3xl',
      '5xl': 'text-5xl',
      '7xl': 'max-md:text-3xl text-7xl',
    },
    duration: {
      slow: 'duration-16000',
      normal: '',
      fast: 'duration-6000',
    },
  },
});

const TextRotate = ({ lines, textSize, duration, centered = false, className }) => {
  // daisyUI supports two to six lines.
  const shown = (lines ?? []).slice(0, 6);

  // cn() would delete the text-rotate root class, so it stays outside.
  return (
    <span
      className={`text-rotate ${cn(rotateVariants({ textSize, duration }), className)}`}
    >
      <span className={centered ? 'justify-items-center' : undefined}>
        {shown.map((line, index) => (
          <span key={`${index}-${line}`}>{line}</span>
        ))}
      </span>
    </span>
  );
};

export default TextRotate;
