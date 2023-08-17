import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import { Suspense } from 'react';
import { Spinner } from 'shared/ui/Spinner/Spinner';

import { LoginFormAsync } from '../LoginForm/LoginForm.async';
import cls from './LoginModal.module.scss';

interface LoginModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export const LoginModal = ({ className, onClose, isOpen }: LoginModalProps) => (
    <Modal
        onClose={onClose}
        isOpen={isOpen}
        className={classNames(cls.LoginModal, {}, [className])}
        lazy
    >
        <Suspense fallback={<Spinner />}>
            <LoginFormAsync />
        </Suspense>
    </Modal>
);
