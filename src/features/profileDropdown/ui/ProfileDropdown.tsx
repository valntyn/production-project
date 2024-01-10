import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo, useCallback } from 'react';
import { MenuDropdown } from 'shared/ui/Popups';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Photo } from 'shared/ui/Photo/Photo';
import { useDispatch, useSelector } from 'react-redux';
import {
    getUserAuthData, isUserAdmin, isUserManager, userActions,
} from 'entities/User';
import { useTranslation } from 'react-i18next';
import cls from './ProfileDropdown.module.scss';

interface ProfileDropdownProps {
    className?: string;
}

export const ProfileDropdown = memo((props: ProfileDropdownProps) => {
    const { className } = props;
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const authData = useSelector(getUserAuthData);
    const isAdmin = useSelector(isUserAdmin);
    const isManager = useSelector(isUserManager);

    const onLogOut = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);
    const isAdminPanelAvailable = isAdmin || isManager;

    if (!authData) {
        return null;
    }

    return (
        <MenuDropdown
            className={classNames(cls.ProfileDropdown, {}, [className])}
            items={[
                ...(isAdminPanelAvailable ? [{
                    content: t('Настройка'),
                    href: RoutePath.admin_panel,
                }] : []),
                {
                    content: t('Профіль'),
                    href: RoutePath.profile + authData.id,
                },
                {
                    content: t('Вийти'),
                    onClick: onLogOut,
                },
            ]}
            trigger={(
                <Photo
                    size={40}
                    className={cls.profile}
                    src={authData.avatar}
                />
            )}
            direction="bottom left"
        />
    );
});
