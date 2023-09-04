import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Comment } from 'entities/Comment';
import { Photo } from 'shared/ui/Photo/Photo';
import { Text } from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';

import cls from './CommentItem.module.scss';

interface CommentItemProps {
    className?: string;
    comment: Comment;
    isLoading?: boolean;
}

export const CommentItem = memo((props: CommentItemProps) => {
    const { className, comment, isLoading } = props;

    if (isLoading) {
        return (
            <div
                className={classNames(
                    cls.CommentItem,
                    {},
                    [className],
                )}
            >
                <div className={cls.header}>
                    <Skeleton width={30} height={30} border="50%" />
                    <Skeleton height={16} width={100} className={cls.header} />
                </div>
                <Skeleton className={cls.text} />
            </div>
        );
    }

    return (
        <div
            className={classNames(
                cls.CommentItem,
                {},
                [className],
            )}
        >
            <div className={cls.header}>
                {comment.user.avatar ? <Photo size={30} border="50%" src={comment.user.avatar} /> : null}
                <Text className={cls.username} title={comment.user.username} />
            </div>
            <Text className={cls.text} text={comment.text} />
        </div>
    );
});
