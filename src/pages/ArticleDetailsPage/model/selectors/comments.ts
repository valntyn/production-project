import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleCommentsIsLoading = (state: StateSchema) => state
    .articleDetailPage?.comments?.isLoading;
export const getArticleCommentsIsError = (state: StateSchema) => state
    .articleDetailPage?.comments?.error;
