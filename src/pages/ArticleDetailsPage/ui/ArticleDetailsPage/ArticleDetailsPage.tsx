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
import { AddCommentForm } from 'features/addCommentForm';
import { Page } from 'widgets/Page/Page';
import { ArticleRecommendationsList } from 'features/articleRecommendationsList';
import { addCommentForArticle } from '../../services/addCommentForArticle';
import { articleDetailsPageReducer } from '../../model/slices';
import {
    fetchCommentsByArticleId,
} from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';

import { ArticleDetailsHeader } from '../ArticleDetailsHeader/ArticleDetailsHeader';
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
    const isLoading = useSelector(getArticleCommentsIsLoading);

    useEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
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
                <ArticleRecommendationsList />
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
