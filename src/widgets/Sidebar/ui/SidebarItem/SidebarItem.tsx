import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink/AppLink';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { Text } from '@/shared/ui/Text/Text';
import { SidebarItemType } from '@/widgets/Sidebar/model/types/sidebar';

import cls from './SidebarItem.module.scss';

interface SidebarItemProps {
    item: SidebarItemType,
    collapsed: boolean,
}

export const SidebarItem = memo(({ collapsed, item }: SidebarItemProps) => {
    const { t } = useTranslation();
    const { text, Icon, path } = item;

    const isAuth = useSelector(getUserAuthData);

    if (item.authOnly && !isAuth) {
        return null;
    }

    return (
        <AppLink
            theme={AppLinkTheme.SECONDARY}
            className={classNames(cls.item, { [cls.collapsed]: collapsed }, [])}
            to={path}
        >
            <Icon className={cls.icon} />
            <Text className={cls.link} text={t(text)} />
        </AppLink>
    );
});
