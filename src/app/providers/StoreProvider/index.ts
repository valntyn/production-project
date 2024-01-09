import { AppDispatch, createReduxStore } from './config/store';
import { StoreProvider } from './ui/StoreProvider';
import type { ReduxStoreWithManager, StateSchema, ThunkConfig } from './config/StateSchema';

export {
    StoreProvider,
    createReduxStore,
    StateSchema,
    ReduxStoreWithManager, ThunkConfig,
};
export type { AppDispatch };
