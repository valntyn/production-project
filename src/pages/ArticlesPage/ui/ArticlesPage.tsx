import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useEffect } from 'react';
import { ArticleList } from 'entities/Article/ui/ArticleList/ArticleList';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModule/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { Page } from 'widgets/Page/Page';
import { useSearchParams } from 'react-router-dom';
import { articlesPageReducer, getArticles } from '../model/slices/articlePageSlice';
import {
    getArticlesPageIsLoading,
    getArticlesPageView,
} from '../model/selectors/articlesPageSelectors';
import { fetchNextArticlesPage } from '../model/services/fetchNextArticlesPage';
import { initArticlesPage } from '../model/services/initArticlesPage';
import { ArticlesPageFilters } from './ArticlesPageFilters/ArticlesPageFilters';

import cls from './ArticlesPage.module.scss';

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};

interface ArticlesPageProps {
    className?: string;
}

const ArticlesPage = ({ className }: ArticlesPageProps) => {
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesPageIsLoading);
    const view = useSelector(getArticlesPageView);

    useEffect(() => {
        dispatch(initArticlesPage(searchParams));
    }, [dispatch, searchParams]);

    const onLoadNextPartArticls = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterMount={false}>
            <Page
                onScrollEnd={onLoadNextPartArticls}
                className={classNames(cls.ArticlesPage, {}, [className])}
            >
                <ArticlesPageFilters />
                <ArticleList
                    isLoading={isLoading}
                    view={view}
                    articles={articles}
                    className={cls.list}
                />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
