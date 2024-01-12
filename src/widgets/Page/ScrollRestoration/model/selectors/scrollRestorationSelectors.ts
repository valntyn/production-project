import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';

export const getScrollRestoration = (state: StateSchema) => state.scrollRestoration;

export const getScrollRestorationByPath = createSelector(
    getScrollRestoration,
    (state: StateSchema, path: string) => path,
    (scroll, path) => scroll[path] || 0,
);
