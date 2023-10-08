import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getUserAuthData } from 'entities/User';
import i18n from 'shared/config/i18n/i18n';
import { getArticleDetailsData } from 'entities/Article/model/selectors/articleDetails';
import {
    fetchCommentsByArticleId,
} from 'pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';

export const addCommentForArticle = createAsyncThunk<Comment, string, ThunkConfig<string>>(
    'articleDetails/addCommentForArticle',
    async (text, thunkApi) => {
        const {
            extra,
            rejectWithValue,
            getState,
            dispatch,
        } = thunkApi;

        const userData = getUserAuthData(getState());
        const article = getArticleDetailsData(getState());

        if (!userData || !text || !article) {
            return rejectWithValue('no data');
        }

        try {
            const response = await extra.api
                .post<Comment>('/comments', {
                    articleId: article.id,
                    userId: userData.id,
                    text,
                });

            dispatch(fetchCommentsByArticleId(article.id));

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            return rejectWithValue(i18n.t('ввели неправильний логін чи пароль'));
        }
    },
);
