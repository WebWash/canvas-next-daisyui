/**
 * Workbench's Default tab renders a component from its prop examples alone, and
 * component.yml can't give a slot an example, so slot-based components would
 * show nothing there.
 *
 * sample() fills an empty slot on that tab only. Mock tabs, pages and the live
 * site never see the sample, and the first render in Next.js isn't affected.
 */
export const isWorkbenchDefaultTab = () => {
  if (
    typeof window === 'undefined' ||
    !window.location.pathname.endsWith('/canvas/workbench-preview.html')
  ) {
    return false;
  }
  try {
    return /^\/component\/[^/]+\/?$/.test(window.parent.location.pathname);
  } catch {
    return false;
  }
};

export const sample = (slot, build) =>
  slot == null && isWorkbenchDefaultTab() ? build() : slot;

export const sampleImage = (seed, width, height, alt) => ({
  src: `https://picsum.photos/seed/${seed}/${width}/${height}`,
  alt,
  width,
  height,
});
