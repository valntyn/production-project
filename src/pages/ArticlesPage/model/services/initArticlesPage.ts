import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ArticleSortField } from '@/entities/Article/model/types/article';
import { SortOrder } from '@/shared/types';
import { articlesPageActions } from '../../model/slices/articlePageSlice';
import { getArticlesPageInited } from '../../model/selectors/articlesPageSelectors';
import { fetchArticlesList } from '../../model/services/fetchArticlesList';

export const initArticlesPage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>(
    'articlesPage/initArticlesPage',
    async (searchParams, thunkApi) => {
        const {
            getState,
            dispatch,
        } = thunkApi;

        const inited = getArticlesPageInited(getState());

        if (!inited) {
            const orderFromUrl = searchParams.get('order') as SortOrder;
            const sortFromUrl = searchParams.get('sort') as ArticleSortField;
            const searchFromUrl = searchParams.get('seacrh');

            orderFromUrl && dispatch(articlesPageActions.setOrder(orderFromUrl));
            sortFromUrl && dispatch(articlesPageActions.setSort(sortFromUrl));
            searchFromUrl && dispatch(articlesPageActions.setSearch(searchFromUrl));

            dispatch(articlesPageActions.initState());
            dispatch(fetchArticlesList({}));
        }
    },
);
