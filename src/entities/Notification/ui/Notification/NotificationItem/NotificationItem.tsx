import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card, CardTheme } from '@/shared/ui/Card/Card';
import { Text } from '@/shared/ui/Text/Text';
import { GetNotification } from '../../../model/types/notification';
import cls from './NotificationItem.module.scss';

interface NotificationItemProps {
    className?: string;
    notification: GetNotification;
}

export const NotificationItem = memo((props: NotificationItemProps) => {
    const { className, notification } = props;

    const content = (
        <Card
            theme={CardTheme.OUTLINED}
            className={classNames(cls.NotificationItem, {}, [className])}
        >
            <Text title={notification.title} text={notification.description} />
        </Card>
    );

    if (notification.href) {
        return (
            <a className={cls.link} target="_blank" href={notification.href} rel="noreferrer">
                {content}
            </a>
        );
    }

    return content;
});
