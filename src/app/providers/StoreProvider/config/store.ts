import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';

import { StateSchema } from './StateSchema';

export function createReduxStore() {
    return configureStore<StateSchema>({
        reducer: {
            counter: counterReducer,
        },
        devTools: __IS_DEV__,
    });
}

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch
