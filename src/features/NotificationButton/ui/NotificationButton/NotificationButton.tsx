import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo } from 'react';
import { Popover } from 'shared/ui/Popups';
import { Icon } from 'shared/ui/Icon/Icon';
import AlarmIcon from 'shared/assets/icons/alarm.svg';
import { NotificationList } from 'entities/Notification';
import cls from './NotificationButton.module.scss';

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
    const { className } = props;

    return (
        <Popover
            trigger={<Icon Svg={AlarmIcon} inverted />}
            className={classNames(cls.NotificationButton, {}, [className])}
            direction="bottom left"
        >
            <NotificationList className={cls.notifications} />
        </Popover>
    );
});
