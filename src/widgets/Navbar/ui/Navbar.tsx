import { classNames } from 'shared/lib/classNames/classNames';
import { useCallback, useState } from 'react';
import { Modal } from 'shared/ui/Modal/Modal';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button/Button';

import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const { t } = useTranslation();

    const onToggleModal = useCallback(() => {
        setIsAuthOpen((prev) => !prev);
    }, []);

    return (
        <div className={classNames(cls.navbar, {}, [className])}>
            <Button
                onClick={onToggleModal}
                theme={ThemeButton.CLEAR_INVERTED}
                className={cls.links}
            >
                {t('Вхід')}
            </Button>
            <Modal isOpen={isAuthOpen} onClose={onToggleModal}>
                TEST
            </Modal>
        </div>
    );
};
