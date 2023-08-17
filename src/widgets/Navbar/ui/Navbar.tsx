import { classNames } from 'shared/lib/classNames/classNames';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { LoginModal } from 'features/AuthByUserName';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, userActions } from 'entities/User';

import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
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
            <div className={classNames(cls.navbar, {}, [className])}>
                <Button
                    onClick={onLogOut}
                    theme={ThemeButton.CLEAR_INVERTED}
                    className={cls.links}
                >
                    {t('Вийти')}
                </Button>
            </div>
        );
    }

    return (
        <div className={classNames(cls.navbar, {}, [className])}>
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
        </div>
    );
};
