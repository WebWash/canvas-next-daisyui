'use client';

import { createContext, createElement, useContext } from 'react';

const JoinContext = createContext(false);
const TooltipContext = createContext(undefined);

/** Tells button, input and select to add join-item to their control. */
export function JoinProvider({ children }) {
  return createElement(JoinContext.Provider, { value: true }, children);
}

export function useInJoin() {
  return useContext(JoinContext);
}

/** Tells button and link which tooltip describes them. */
export function TooltipProvider({ id, children }) {
  return createElement(TooltipContext.Provider, { value: id }, children);
}

export function useTooltipId() {
  return useContext(TooltipContext);
}
