import { cva } from 'class-variance-authority';
import { cn } from 'drupal-canvas';

import { Icon } from '@/lib/icons';

const stepVariants = cva('step', {
  variants: {
    color: {
      default: '',
      neutral: 'step-neutral',
      primary: 'step-primary',
      secondary: 'step-secondary',
      accent: 'step-accent',
      info: 'step-info',
      success: 'step-success',
      warning: 'step-warning',
      error: 'step-error',
    },
  },
});

/** Child of steps. The root must be the <li>. */
const Step = ({ label, color, icon = 'none', dataContent, className }) => {
  return (
    <li
      data-content={dataContent}
      className={cn(stepVariants({ color }), 'list-none', className)}
    >
      {icon !== 'none' && (
        <span className="step-icon">
          <Icon name={icon} className="size-4" />
        </span>
      )}
      {label}
    </li>
  );
};

export default Step;
