import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
    getArticlesPageView,
} from 'pages/ArticlesPage/model/selectors/articlesPageSelectors';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { ArticleView, ViewSelector } from 'entities/Article';
import { articlesPageActions } from 'pages/ArticlesPage/model/slices/articlePageSlice';
import { Card } from 'shared/ui/Card/Card';
import { Input } from 'shared/ui/Input/Input';
import { ArticleSortSelector } from 'entities/Article/ui/ArticleSortSelector/ArticleSortSelector';
import { ArticleSortField } from 'entities/Article/model/types/article';
import { SortOrder } from 'shared/types';

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

    const onChangeSort = useCallback((sort: ArticleSortField) => {
        dispatch(articlesPageActions.setSort(sort));
    }, [dispatch]);

    const onChangeOrder = useCallback((order: SortOrder) => {
        dispatch(articlesPageActions.setOrder(order));
    }, [dispatch]);

    const onChangeSeacrh = useCallback((search: string) => {
        dispatch(articlesPageActions.setSearch(search));
    }, [dispatch]);

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlesPageActions.setView(view));
    }, [dispatch]);

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
