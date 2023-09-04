import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Comment } from 'entities/Comment';
import { Text } from 'shared/ui/Text/Text';
import { CommentItem } from 'entities/Comment/ui/CommentItem/CommentItem';

import cls from './CommentList.module.scss';

interface CommentListProps {
    className?: string;
    comments: Comment[];
    isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
    const { className, isLoading, comments } = props;

    return (
        <div
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
                    />
                ))
                : <Text text="Comments are upsent" />}
        </div>
    );
});
