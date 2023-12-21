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
import {
    ArticleDetailsCommentSchema,
    ArticleDetailsRecommendationSchema,
} from 'pages/ArticleDetailsPage';
import { AddCommentFromSchema } from 'features/addCommentForm';
import { ArticlesPageScheme } from 'pages/ArticlesPage';
import { ScrollRestorationScheme } from 'widgets/Page/ScrollRestoration';

export interface StateSchema {
    // blank
    counter: CounterSchema,

    // required
    user: UserSchema,
    scrollRestoration: ScrollRestorationScheme,

    // async
    login?: LoginSchema,
    profile?: ProfileSchema,
    articleDetais?: ArticleDetailsSchema,
    articleDetailsComments?: ArticleDetailsCommentSchema,
    articleDetailsRecommendation?: ArticleDetailsRecommendationSchema,
    addCommentForm?: AddCommentFromSchema,
    articlesPage?: ArticlesPageScheme,
}

export type OptionalRecord<K extends keyof any, T> = {
    [P in K]?: T;
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
