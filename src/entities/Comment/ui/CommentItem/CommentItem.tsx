import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Comment } from 'entities/Comment';
import { Photo } from 'shared/ui/Photo/Photo';
import { Text } from 'shared/ui/Text/Text';

import cls from './CommentItem.module.scss';

interface CommentItemProps {
    className?: string;
    comment: Comment;
    isLoading?: boolean;
}

export const CommentItem = memo((props: CommentItemProps) => {
    const { className, comment, isLoading } = props;

    return (
        <div
            className={classNames(
                cls.CommentItem,
                {},
                [className],
            )}
        >
            <div className={cls.header}>
                <Photo size={30} />
                <Text className={cls.username} title={comment.user.username} />
            </div>
            <Text className={cls.text} text={comment.text} />
        </div>
    );
});
