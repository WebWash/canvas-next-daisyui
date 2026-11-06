'use client';

import { cn } from 'drupal-canvas';

import { useDomId } from '@/lib/dom-id';
import { GroupProvider } from '@/lib/group-context';
import AccordionItem from '@/components/accordion-item';
import { sample } from '@/lib/sample';

/** Shares one <details name> between items, which makes them exclusive. */
const Accordion = ({ indicator = 'arrow', bordered = false, items, className }) => {
  const name = useDomId();

  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      <GroupProvider
        name={name}
        options={{ accordionIndicator: indicator, accordionBordered: bordered }}
      >
        {sample(items, () => (
          <>
            <AccordionItem
              title="What is daisyUI?"
              openByDefault
              content={<p>A component library for Tailwind CSS.</p>}
            />
            <AccordionItem
              title="Does it need JavaScript?"
              content={<p>Most components work with CSS alone.</p>}
            />
            <AccordionItem
              title="Can I change the theme?"
              content={<p>Yes. Pick a theme, or make your own.</p>}
            />
          </>
        ))}
      </GroupProvider>
    </div>
  );
};

export default Accordion;
