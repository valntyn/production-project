import { Suspense } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Spinner } from '@/shared/ui/Spinner/Spinner';

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
        title="Login"
        lazy
    >
        <Suspense fallback={<Spinner />}>
            <LoginFormAsync onSuccess={onClose} />
        </Suspense>
    </Modal>
);
