'use client';

import { createContext, createElement, useContext } from 'react';

const GroupContext = createContext(null);

/**
 * Shares a group name, and any options, from a parent to the children in its
 * slot. Slot elements are CanvasElement wrappers, so they can't be cloned.
 */
export function GroupProvider({ name, options, children }) {
  return createElement(
    GroupContext.Provider,
    { value: { name, ...options } },
    children,
  );
}

export function useGroupName() {
  return useContext(GroupContext)?.name;
}

export function useGroupOptions() {
  return useContext(GroupContext) ?? {};
}
