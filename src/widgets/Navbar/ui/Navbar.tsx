import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { LoginModal } from '@/features/AuthByUserName';
import { getUserAuthData } from '@/entities/User';
import { Text } from '@/shared/ui/Text/Text';
import { HStack } from '@/shared/ui/Stack/HStack/HStack';
import {
    NotificationButton,
} from '@/features/NotificationButton/ui/NotificationButton/NotificationButton';
import { ProfileDropdown } from '@/features/profileDropdown';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const authData = useSelector(getUserAuthData);

    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const { t } = useTranslation();

    const onClose = useCallback(() => {
        setIsAuthOpen(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthOpen(true);
    }, []);

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
                    <NotificationButton />
                    <ProfileDropdown />
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
