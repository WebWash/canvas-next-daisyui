'use client';

import Menu from '@/components/menu';
import MenuItem from '@/components/menu-item';
import { useDomId } from '@/lib/dom-id';
import { useGroupOptions } from '@/lib/group-context';
import { isWorkbenchDefaultTab, sample } from '@/lib/sample';

const sampleColumn = (label, links) => (
  <MenuItem
    label={label}
    isTitle
    submenu={links.map((link) => (
      <MenuItem key={link} label={link} link="/" />
    ))}
  />
);

/**
 * Child of megamenu: a button and its popover, as two sibling roots. A menu in
 * the panel drops its own surface and tree lines: the panel is the surface, and
 * its nested lists are columns.
 */
const MegamenuItem = ({ label, content }) => {
  const id = useDomId();
  const { inMegamenu } = useGroupOptions();

  const item = (
    <>
      <button type="button" popoverTarget={id}>
        {label}
      </button>
      <div
        id={id}
        popover="auto"
        className="p-4 text-base-content [&_.menu]:w-full [&_.menu]:bg-transparent [&_.menu]:p-0 [&_.menu_ul]:ms-0 [&_.menu_ul]:ps-0 [&_.menu_ul]:before:hidden"
      >
        {sample(content, () => (
          <Menu
            direction="responsive"
            items={
              <>
                {sampleColumn('Explore', ['Components', 'Themes', 'Templates'])}
                {sampleColumn('Learn', ['Docs', 'Examples', 'Changelog'])}
                {sampleColumn('Company', ['About', 'Blog', 'Contact'])}
              </>
            }
          />
        ))}
      </div>
    </>
  );

  // Alone on its Default tab, it still needs a megamenu to be styled and placed.
  if (!inMegamenu && isWorkbenchDefaultTab()) {
    return (
      <div className="megamenu border border-base-300 p-2">
        <span className="megamenu-active" />
        {item}
      </div>
    );
  }

  return item;
};

export default MegamenuItem;
