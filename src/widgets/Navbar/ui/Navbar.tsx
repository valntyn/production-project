import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { LoginModal } from 'features/AuthByUserName';
import { useDispatch, useSelector } from 'react-redux';
import {
    getUserAuthData, isUserAdmin, isUserManager, userActions,
} from 'entities/User';
import { Text } from 'shared/ui/Text/Text';

import { MenuDropdown } from 'shared/ui/Popups/components/MenuDropdown/MenuDropdown';
import { Photo } from 'shared/ui/Photo/Photo';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { HStack } from 'shared/ui/Stack/HStack/HStack';
import { Icon } from 'shared/ui/Icon/Icon';
import AlarmIcon from 'shared/assets/icons/alarm.svg';
import { Popover } from 'shared/ui/Popups';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const dispatch = useDispatch();
    const authData = useSelector(getUserAuthData);
    const isAdmin = useSelector(isUserAdmin);
    const isManager = useSelector(isUserManager);

    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const { t } = useTranslation();

    const onClose = useCallback(() => {
        setIsAuthOpen(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthOpen(true);
    }, []);

    const onLogOut = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    const isAdminPanelAvailable = isAdmin || isManager;

    if (authData) {
        return (
            <header className={classNames(cls.navbar, {}, [className])}>
                <Text className={cls.appName} title="REACT PET PROJECT" />
                <div className={cls.headerButtons}>
                    <Button>
                        New Article
                    </Button>
                </div>
                <HStack gap="16" className={cls.actions} align="center" justify="center">
                    <Button
                        theme={ThemeButton.CLEAR}
                    >
                        <Popover
                            trigger={<Icon Svg={AlarmIcon} inverted />}
                            direction="bottom left"
                        >
                            123
                        </Popover>
                    </Button>
                    <MenuDropdown
                        className={cls.dropdown}
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
                </HStack>
            </header>
        );
    }

    return (
        <header className={classNames(cls.navbar, {}, [className])}>
            <Button
                onClick={onShowModal}
                theme={ThemeButton.CLEAR_INVERTED}
                className={cls.links}
            >
                {t('Вхід')}
            </Button>
            {isAuthOpen && (
                <LoginModal
                    isOpen={isAuthOpen}
                    onClose={onClose}
                />
            )}
        </header>
    );
});
