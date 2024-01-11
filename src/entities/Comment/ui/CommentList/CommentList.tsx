import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/Text/Text';
import { VStack } from '@/shared/ui/Stack/VStack/VStack';
import { Comment } from '../../model/types/comment';
import { CommentItem } from '../CommentItem/CommentItem';

import cls from './CommentList.module.scss';

interface CommentListProps {
    className?: string;
    comments: Comment[];
    isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
    const { className, isLoading, comments } = props;

    return (
        <VStack
            max
            className={classNames(
                cls.CommentList,
                {},
                [className],
            )}
        >
            {comments?.length
                ? comments.map((comment) => (
                    <CommentItem
                        comment={comment}
                        isLoading={isLoading}
                        className={cls.comment}
                        key={comment?.id}
                    />
                ))
                : <Text text="Comments are upsent" />}
        </VStack>
    );
});
