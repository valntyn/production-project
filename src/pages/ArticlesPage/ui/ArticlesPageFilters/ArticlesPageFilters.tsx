import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
    getArticlesPageView,
    getArticlesType,
} from 'pages/ArticlesPage/model/selectors/articlesPageSelectors';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { ArticleView, ViewSelector } from 'entities/Article';
import { articlesPageActions } from 'pages/ArticlesPage/model/slices/articlePageSlice';
import { Card } from 'shared/ui/Card/Card';
import { Input } from 'shared/ui/Input/Input';
import { ArticleSortSelector } from 'entities/Article/ui/ArticleSortSelector/ArticleSortSelector';
import { fetchArticlesList } from 'pages/ArticlesPage/model/services/fetchArticlesList';
import { useDebounce } from 'shared/lib/hooks/useDebounce';
import { SortOrder } from 'shared/types';
import { ArticleSortField, ArticleType } from 'entities/Article/model/types/article';
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs';

import cls from './ArticlesPageFilters.module.scss';

interface ArticlesPageFiltersProps {
    className?: string;
}

export const ArticlesPageFilters = memo((props: ArticlesPageFiltersProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const view = useSelector(getArticlesPageView);
    const sort = useSelector(getArticlesPageSort);
    const order = useSelector(getArticlesPageOrder);
    const seacrh = useSelector(getArticlesPageSearch);
    const type = useSelector(getArticlesType);

    // todo refactor dublicated code and decomposition
    const fetchData = useCallback(() => {
        dispatch(fetchArticlesList({ replace: true }));
    }, [dispatch]);

    const debouncedFetchData = useDebounce(fetchData, 500);

    const onChangeSort = useCallback((sort: ArticleSortField) => {
        dispatch(articlesPageActions.setSort(sort));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
    }, [fetchData, dispatch]);

    const onChangeOrder = useCallback((order: SortOrder) => {
        dispatch(articlesPageActions.setOrder(order));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
    }, [fetchData, dispatch]);

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlesPageActions.setView(view));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
    }, [fetchData, dispatch]);

    const onChangeSeacrh = useCallback((search: string) => {
        dispatch(articlesPageActions.setSearch(search));
        dispatch(articlesPageActions.setPage(1));
        debouncedFetchData();
    }, [debouncedFetchData, dispatch]);

    const onChangeType = useCallback((tabItem: TabItem) => {
        dispatch(articlesPageActions.setType(tabItem.value as ArticleType));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
    }, [fetchData, dispatch]);

    const typeTabs = useMemo<TabItem[]>(() => [
        {
            value: ArticleType.IT,
            content: 'Айті',
        },
        {
            value: ArticleType.SCIENCE,
            content: 'Наука',
        },
        {
            value: ArticleType.ECONOMICS,
            content: 'Економіка',
        },
    ], []);

    return (
        <div className={classNames(cls.ArticlesPageFilters, {}, [className])}>
            <div className={cls.sortWrapper}>
                <ArticleSortSelector
                    sort={sort}
                    order={order}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
                <ViewSelector view={view} onViewClick={onChangeView} />
            </div>
            <Tabs
                tabs={typeTabs}
                value={type}
                onTabClick={onChangeType}
            />
            <Card>
                <Input
                    placeholder="Пошук "
                    value={seacrh}
                    onChange={onChangeSeacrh}
                />
            </Card>
        </div>
    );
});
