import { rtkApi } from '@/shared/api/rtkApi';
import { GetArticleParams, GetArticleRating, PostArticleRating } from '../model/types/types';

const articleRatingApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRatings: build.query<GetArticleRating[], GetArticleParams>({
            query: ({ articleId, userId }) => ({
                url: '/article-ratings',
                params: {
                    userId,
                    articleId,
                },
            }),
        }),
        rateArticle: build.mutation<void, PostArticleRating>({
            query: (body) => ({
                url: '/article-ratings',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const useGetArticleRating = articleRatingApi.useGetArticleRatingsQuery;
export const usePostArticleRating = articleRatingApi.useRateArticleMutation;
