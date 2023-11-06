import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import i18n from 'shared/config/i18n/i18n';
import { Article } from 'entities/Article';
import {
    getArticlesPageLimit,
    getArticlesPageNum,
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
} from 'pages/ArticlesPage/model/selectors/articlesPageSelectors';

interface FetchArticlesListProps {
}

export const fetchArticlesList = createAsyncThunk<
    Article[],
    FetchArticlesListProps,
    ThunkConfig<string>
>(
    'articlesList/fetchArticles',

    async (_, thunkApi) => {
        const {
            extra,
            rejectWithValue,
            getState,
        } = thunkApi;

        const limit = getArticlesPageLimit(getState());
        const page = getArticlesPageNum(getState());
        const sort = getArticlesPageSort(getState());
        const order = getArticlesPageOrder(getState());
        const seacrh = getArticlesPageSearch(getState());

        try {
            const response = await extra.api
                .get<Article[]>('/articles', {
                    params: {
                        _expand: 'user',
                        _limit: limit,
                        _page: page,
                        _sort: sort,
                        _order: order,
                        q: seacrh,
                    },
                });

            return response.data;
        } catch (e) {
            return rejectWithValue(i18n.t('error'));
        }
    },
);
