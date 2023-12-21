import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleRecommendationIsLoading = (state: StateSchema) => state
    .articleDetailsRecommendation?.isLoading;
export const getArticleRecommendationIsError = (state: StateSchema) => state
    .articleDetailsRecommendation?.error;
