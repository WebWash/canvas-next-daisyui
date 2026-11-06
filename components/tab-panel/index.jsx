'use client';

import { useDomId } from '@/lib/dom-id';
import { useGroupName } from '@/lib/group-context';
import { isWorkbenchDefaultTab, sample } from '@/lib/sample';

/** Child of tabs: a radio and its panel, which must immediately follow it. */
const TabPanel = ({ label, openByDefault = false, content }) => {
  const name = useGroupName();
  const id = useDomId();
  // Alone on its Default tab, it still needs tabs to be styled.
  const alone = !name && isWorkbenchDefaultTab();

  const panel = (
    <>
      <input
        id={id}
        type="radio"
        name={name}
        className="tab"
        aria-label={label}
        defaultChecked={openByDefault || alone}
      />
      <div
        role="region"
        aria-labelledby={id}
        className="tab-content border-base-300 bg-base-100 p-6 text-base-content"
      >
        {sample(content, () => <p>Panel content.</p>)}
      </div>
    </>
  );

  return alone ? (
    <div role="group" aria-label={label} className="tabs tabs-box">
      {panel}
    </div>
  ) : (
    panel
  );
};

export default TabPanel;
