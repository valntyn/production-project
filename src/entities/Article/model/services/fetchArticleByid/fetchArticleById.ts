import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import i18n from 'shared/config/i18n/i18n';

import { Article } from '../../types/article';

export const fetchArticleById = createAsyncThunk<Article, string, ThunkConfig<string>>(
    'article/fetchArticleById',

    async (articleId, thunkApi) => {
        const {
            extra,
            rejectWithValue,
        } = thunkApi;

        try {
            const response = await extra.api
                .get<Article>(`/articles/${articleId}`, {
                    params: {
                        _expand: 'user',
                    },
                });

            return response.data;
        } catch (e) {
            return rejectWithValue(i18n.t('error'));
        }
    },
);
