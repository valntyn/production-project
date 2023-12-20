import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleView } from 'entities/Article';
import { ArticleSortField, ArticleType } from 'entities/Article/model/types/article';

export const getArticlesPageIsLoading = (
    state: StateSchema,
) => state.articlesPage?.isLoading || false;
export const getArticlesPageError = (state: StateSchema) => state.articlesPage?.error;
export const getArticlesPageView = (
    state: StateSchema,
) => state.articlesPage?.view || ArticleView.SMALL;
export const getArticlesPageOrder = (
    state: StateSchema,
) => state.articlesPage?.order || 'asc';
export const getArticlesPageSort = (
    state: StateSchema,
) => state.articlesPage?.sort || ArticleSortField.CREATED;
export const getArticlesType = (
    state: StateSchema,
) => state.articlesPage?.type || ArticleType.ALL;
export const getArticlesPageSearch = (
    state: StateSchema,
) => state.articlesPage?.search || '';
export const getArticlesPageNum = (
    state: StateSchema,
) => state.articlesPage?.page || 1;
export const getArticlesPageLimit = (
    state: StateSchema,
) => state.articlesPage?.limit || 9;
export const getArticlesPageHasMore = (
    state: StateSchema,
) => state.articlesPage?.hasMore;
export const getArticlesPageInited = (
    state: StateSchema,
) => state.articlesPage?._inited;
