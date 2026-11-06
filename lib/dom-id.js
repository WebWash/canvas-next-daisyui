'use client';

import { useId } from 'react';

/** useId() without punctuation, safe for id, name and CSS anchor-name. */
export function useDomId() {
  return `id${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
}
