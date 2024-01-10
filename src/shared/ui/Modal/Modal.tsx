import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import React, { ReactNode } from 'react';
import { useTheme } from '@/app/providers/ThemeProvider';

import { useModal } from '@/shared/lib/hooks/useModal';
import { createUseGesture, dragAction } from '@use-gesture/react';
import { animated, useSpring } from '@react-spring/web';
import { Text, TextAlign, TextTheme } from '@/shared/ui/Text/Text';
import { Overlay } from '../Overlay/Overlay';
import cls from './Modal.module.scss';
import { Portal } from '../Portal/Portal';

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    title?: string;
    lazy?: boolean;
}

const ANIMATION_DELAY = 300;

const useGesture = createUseGesture([dragAction]);

export const Modal = ({
    className, children, onClose, isOpen, lazy, title,
}: ModalProps) => {
    const { close, isClosing, isMounted } = useModal({
        animationDelay: ANIMATION_DELAY,
        isOpen,
        onClose,
    });
    const { theme } = useTheme();

    const [style, api] = useSpring(() => ({
        x: 0,
        y: 0,
        scale: 1,
        rotateZ: 0,
    }));
    const ref = React.useRef<HTMLDivElement>(null);

    useGesture(
        {
            onDrag: ({ pinching, cancel, offset: [ox, oy] }) => {
                if (pinching) return cancel();
                api.start({
                    x: ox,
                    y: oy,
                    immediate: true,
                });
            },
        },
        {
            target: ref,
            drag: {
                from: () => [style.x.get(), style.y.get()],
                bounds: {
                    left: -window.innerWidth / 2,
                    right: window.innerWidth / 2,
                    top: -window.innerHeight / 2,
                    bottom: window.innerHeight / 2,
                },
            },
            rubberband: true,
        },
    );

    const mods: Mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };

    if (lazy && !isMounted) {
        return null;
    }

    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className, theme, 'app_modal'])}>
                <Overlay onClick={close} />
                <animated.div
                    className={cls.wrapper}
                    style={style}
                >
                    <div className={cls.titleWrapper} ref={ref}>
                        <Text
                            title={title}
                            align={TextAlign.CENTER}
                            theme={TextTheme.SECONDARY}
                        />
                    </div>
                    <div className={cls.content}>{children}</div>
                </animated.div>
            </div>
        </Portal>
    );
};
