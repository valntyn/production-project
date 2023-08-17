import { ReducersMapObject, configureStore } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';

import { StateSchema } from './StateSchema';
import { createReducerManager } from './reducerManager';

export function createReduxStore() {
    // required reducers
    const rootReducers: ReducersMapObject<StateSchema> = {
        counter: counterReducer,
        user: userReducer,
    };

    const reducerManager = createReducerManager(rootReducers);

    const store = configureStore<StateSchema>({
        reducer: reducerManager.reduce,
        devTools: __IS_DEV__,
    });

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}
