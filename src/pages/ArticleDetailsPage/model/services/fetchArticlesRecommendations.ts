import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import i18n from '@/shared/config/i18n/i18n';
import { Article } from '@/entities/Article';

export const fetchArticlesRecommendations = createAsyncThunk<
    Article[],
    void,
    ThunkConfig<string>
>(
    'articlesList/fetchArticles',

    async (_, thunkApi) => {
        const {
            extra,
            rejectWithValue,
        } = thunkApi;

        try {
            const response = await extra.api
                .get<Article[]>('/articles', {
                    params: {
                        _limit: 4,
                    },
                });

            return response.data;
        } catch (e) {
            return rejectWithValue(i18n.t('error'));
        }
    },
);
