import { memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import { AddCommentForm } from '@/features/addCommentForm';
import { CommentList } from '@/entities/Comment';
import { VStack } from '@/shared/ui/Stack/VStack/VStack';
import { getArticleComments } from '../../model/slices/articleDetailsCommentSlice';
import {
    fetchCommentsByArticleId,
} from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { addCommentForArticle } from '../../services/addCommentForArticle';
import cls from './ArticleDetailsComments.module.scss';

interface ArticleDetailsCommentsProps {
    id: string;
    className?: string;
}

export const ArticleDetailsComments = memo((props: ArticleDetailsCommentsProps) => {
    const { className, id } = props;
    const comments = useSelector(getArticleComments.selectAll);
    const isLoading = useSelector(getArticleCommentsIsLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    }, [dispatch, id]);

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);

    return (
        <VStack max className={classNames('', {}, [className])}>
            <Text
                title="Comment"
                className={cls.commentTitle}
                size={TextSize.L}
            />
            <AddCommentForm onSendComment={onSendComment} className={cls.form} />
            <CommentList
                comments={comments}
                isLoading={isLoading}
            />
        </VStack>
    );
});
