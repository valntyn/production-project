import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useEffect } from 'react';
import { ArticleList } from 'entities/Article/ui/ArticleList/ArticleList';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModule/DynamicModuleLoader';
import {
    articlesPageActions,
    articlesPageReducer,
    getArticles,
} from 'pages/ArticlesPage/model/slices/articlePageSlice';
import { useSelector } from 'react-redux';
import { fetchArticlesList } from 'pages/ArticlesPage/model/services/fetchArticlesList';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import {
    getArticlesPageError,
    getArticlesPageIsLoading,
    getArticlesPageView,
} from 'pages/ArticlesPage/model/selectors/articlesPageSelectors';
import { ArticleView, ViewSelector } from 'entities/Article';

import cls from './ArticlesPage.module.scss';

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};

interface ArticlesPageProps {
    className?: string;
}

const ArticlesPage = ({ className }: ArticlesPageProps) => {
    const dispatch = useAppDispatch();
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesPageIsLoading);
    const error = useSelector(getArticlesPageError);
    const view = useSelector(getArticlesPageView);

    useEffect(() => {
        dispatch(fetchArticlesList());
        dispatch(articlesPageActions.initState());
    }, [dispatch]);

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlesPageActions.setView(view));
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterMount>
            <div className={classNames(cls.ArticlesPage, {}, [className])}>
                <ViewSelector view={view} onViewClick={onChangeView} />
                <ArticleList
                    isLoading={isLoading}
                    view={view}
                    articles={articles}
                />
            </div>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
