import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleRecommendationIsLoading = (state: StateSchema) => state
    .articleDetailPage?.recommendations?.isLoading;
export const getArticleRecommendationIsError = (state: StateSchema) => state
    .articleDetailPage?.recommendations?.error;
