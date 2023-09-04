import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Comment } from 'entities/Comment';
import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleDetailsCommentSchema } from 'pages/ArticleDetailsPage';

const commentsAdapter = createEntityAdapter<Comment>({
    selectId: (comment) => comment.id,
});

export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
    (state) => state.articleDetailsComments || commentsAdapter.getInitialState(),
);

const articleDetailsCommentSlice = createSlice({
    name: 'articleDetailsCommentSlice',
    initialState: commentsAdapter.getInitialState<ArticleDetailsCommentSchema>({
        isLoading: false,
        error: false,
        ids: ['1', '2'],
        entities: {
            1: {
                id: '1',
                text: 'comment 1',
                user: { id: '1', username: '1' },
            },
            2: {
                id: '2',
                text: 'comment 2',
                user: { id: '1', username: '1' },
            },
        },
    }),
    reducers: {

    },
});

export const { reducer: articleDetailsCommentsReducer } = articleDetailsCommentSlice;
