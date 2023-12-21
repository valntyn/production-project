import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useEffect } from 'react';
import { ArticleDetails } from 'entities/Article';
import { useParams } from 'react-router-dom';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { CommentList } from 'entities/Comment';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModule/DynamicModuleLoader';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchCommentsByArticleId,
} from 'pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { AddCommentForm } from 'features/addCommentForm';
import { addCommentForArticle } from 'pages/ArticleDetailsPage/services/addCommentForArticle';
import { Page } from 'widgets/Page/Page';
import {
    getArticleRecommendationIsLoading,
} from 'pages/ArticleDetailsPage/model/selectors/recommendation';
import { ArticleList } from 'entities/Article/ui/ArticleList/ArticleList';
import {
    fetchArticlesRecommendations,
} from 'pages/ArticleDetailsPage/model/services/fetchArticlesRecommendations';
import { articleDetailsPageReducer } from 'pages/ArticleDetailsPage/model/slices';

import { ArticleDetailsHeader } from '../ArticleDetailsHeader/ArticleDetailsHeader';
import {
    getArticleRecommendations,
} from '../../model/slices/articleDetailsPageRecommendationSlice';
import { getArticleComments } from '../../model/slices/articleDetailsCommentSlice';
import cls from './ArticleDetailsPage.module.scss';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';

interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articleDetailPage: articleDetailsPageReducer,
};

// todo refactor, divide logic into independent components
const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
    const { t } = useTranslation('articles');
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const comments = useSelector(getArticleComments.selectAll);
    const recommendations = useSelector(getArticleRecommendations.selectAll);
    const recommendationsIsLoading = useSelector(getArticleRecommendationIsLoading);
    const isLoading = useSelector(getArticleCommentsIsLoading);

    useEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
        dispatch(fetchArticlesRecommendations());
    }, [dispatch, id]);

    const onSendComment = useCallback((text) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);

    if (!id) {
        return (
            <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                {t('Нема такой статті')}
            </div>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterMount>
            <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                <ArticleDetailsHeader />
                <ArticleDetails id={id} />
                <Text
                    title="Recommendations"
                    className={cls.commentTitle}
                    size={TextSize.L}
                />
                <ArticleList
                    articles={recommendations}
                    isLoading={recommendationsIsLoading}
                    className={cls.recommendations}
                    target="_blank"
                />
                <Text
                    title="Comment"
                    className={cls.commentTitle}
                    size={TextSize.L}
                />
                <AddCommentForm onSendComment={onSendComment} />
                <CommentList
                    comments={comments}
                    isLoading={isLoading}
                />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
