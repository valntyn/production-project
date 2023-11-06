import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ScrollRestorationScheme } from '../types/ScrollRestorationScheme';

const initialState: ScrollRestorationScheme = {};

export const ScrollRestorationSlice = createSlice({
    name: 'scrollRestoration',
    initialState,
    reducers: {
        setScrollPosition: (state, { payload }: PayloadAction<{
            path: string,
            position: number
        }>) => {
            state[payload.path] = payload.position;
        },
    },
});

export const { actions: scrollRestorationActions } = ScrollRestorationSlice;
export const { reducer: scrollRestorationReducer } = ScrollRestorationSlice;
