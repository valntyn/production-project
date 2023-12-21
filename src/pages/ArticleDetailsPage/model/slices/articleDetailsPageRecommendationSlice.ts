import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleDetailsCommentSchema } from 'pages/ArticleDetailsPage';
import { Article } from 'entities/Article';
import {
    fetchArticlesRecommendations,
} from 'pages/ArticleDetailsPage/model/services/fetchArticlesRecommendations';

const recommendationAdapter = createEntityAdapter<Article>({
    selectId: (article) => article.id,
});

export const getArticleRecommendations = recommendationAdapter.getSelectors<StateSchema>(
    (state) => state.articleDetailsRecommendation || recommendationAdapter.getInitialState(),
);

const articleDetailsPageRecommendationSlice = createSlice({
    name: 'articleDetailsPageRecommendationSlice',
    initialState: recommendationAdapter.getInitialState<ArticleDetailsCommentSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticlesRecommendations.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchArticlesRecommendations.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    recommendationAdapter.setAll(state, action.payload);
                },
            )
            .addCase(fetchArticlesRecommendations.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    reducer: articleDetailsPageRecommendationReducer,
} = articleDetailsPageRecommendationSlice;
