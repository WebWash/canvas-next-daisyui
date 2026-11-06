'use client';

import { useGroupOptions } from '@/lib/group-context';
import { Icon } from '@/lib/icons';

/** Child of fab. Flower layouts have no room for a visible label. */
const FabAction = ({ icon = 'star', label, link }) => {
  const { fabFlower } = useGroupOptions();
  const Element = link ? 'a' : 'button';
  const control = (
    <Element
      href={link}
      type={link ? undefined : 'button'}
      aria-label={label}
      className="btn btn-lg btn-circle"
    >
      <Icon name={icon} />
    </Element>
  );

  if (fabFlower) {
    return control;
  }

  return (
    <div>
      {label}
      {control}
    </div>
  );
};

export default FabAction;
