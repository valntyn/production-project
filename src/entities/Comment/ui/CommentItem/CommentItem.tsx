import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Photo } from 'shared/ui/Photo/Photo';
import { Text } from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { HStack } from 'shared/ui/Stack/HStack/HStack';
import { Comment } from '../../model/types/comment';

import cls from './CommentItem.module.scss';

interface CommentItemProps {
    className?: string;
    comment: Comment;
    isLoading?: boolean;
}

export const CommentItem = memo((props: CommentItemProps) => {
    const { className, comment, isLoading } = props;

    if (!comment) {
        return null;
    }

    if (isLoading) {
        return (
            <div
                className={classNames(
                    cls.CommentItem,
                    {},
                    [className],
                )}
            >
                <HStack className={cls.header}>
                    <Skeleton width={30} height={30} border="50%" />
                    <Skeleton height={16} width={100} className={cls.header} />
                </HStack>
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
            <AppLink to={`${RoutePath.profile}${comment.user.id}`} className={cls.header}>
                {comment.user.avatar
                    ? <Photo size={30} border="50%" src={comment.user.avatar} />
                    : null}
                <Text className={cls.username} title={comment.user.username} />
            </AppLink>
            <Text className={cls.text} text={comment.text} />
        </div>
    );
});
