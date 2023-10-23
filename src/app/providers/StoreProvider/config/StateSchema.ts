import {
    AnyAction,
    CombinedState,
    EnhancedStore,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ArticleDetailsSchema } from 'entities/Article';
import { CounterSchema } from 'entities/Counter';
import { ProfileSchema } from 'entities/Profile';
import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUserName';
import { ArticleDetailsCommentSchema } from 'pages/ArticleDetailsPage';
import { AddCommentFromSchema } from 'features/addCommentForm';
import { ArticlesPageScheme } from 'pages/ArticlesPage';
import { OptionalRecord } from 'app/types/global';

export interface StateSchema {
    // blank
    counter: CounterSchema,

    // required
    user: UserSchema,

    // async
    login?: LoginSchema,
    profile?: ProfileSchema,
    articleDetais?: ArticleDetailsSchema,
    articleDetailsComments?: ArticleDetailsCommentSchema,
    addCommentForm?: AddCommentFromSchema,
    articlesPage?: ArticlesPageScheme,
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>,
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>,
    add: (key: StateSchemaKey, reducer: Reducer) => void,
    remove: (key: StateSchemaKey) => void,
    // true - inited, false - destroyed
    getMountedReducers: () => MountedReducers,
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager,
}

export interface ThunkExtraArg {
    api: AxiosInstance,
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg,
    state: StateSchema,
}
