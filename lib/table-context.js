'use client';

import { createContext, createElement, useContext } from 'react';

const TableContext = createContext(null);

/**
 * Tells table-row and table-cell what surrounds them. Editors can place a
 * component in any slot, and a bare <tr> or <td> is invalid HTML that breaks
 * hydration, so children outside a table render their own table around them.
 */
export function TableProvider({ level, children }) {
  return createElement(TableContext.Provider, { value: level }, children);
}

export function useTableLevel() {
  return useContext(TableContext);
}
