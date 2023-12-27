import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { LoginModal } from 'features/AuthByUserName';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, userActions } from 'entities/User';
import { Text } from 'shared/ui/Text/Text';

import { MenuDropdown } from 'shared/ui/MenuDropdown/MenuDropdown';
import { Photo } from 'shared/ui/Photo/Photo';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const dispatch = useDispatch();
    const authData = useSelector(getUserAuthData);

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

    if (authData) {
        return (
            <header className={classNames(cls.navbar, {}, [className])}>
                <Text className={cls.appName} title="REACT PET PROJECT" />
                <div className={cls.headerButtons}>
                    <Button>
                        New Article
                    </Button>
                </div>
                <MenuDropdown
                    items={[
                        { content: '123' },
                        {
                            content: t('Профіль'),
                            href: RoutePath.profile + authData.id,
                        },
                        {
                            content: t('Вийти'),
                            onClick: onLogOut,
                        },
                    ]}
                    className={cls.dropdown}
                    trigger={(
                        <Photo
                            size={40}
                            className={cls.profile}
                            src={authData.avatar}
                        />
                    )}
                    direction="bottom left"
                />
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
