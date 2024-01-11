/* eslint-disable react/jsx-props-no-spreading */
import {
    ButtonHTMLAttributes, CSSProperties, memo, useMemo,
} from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';

import cls from './Button.module.scss';

export enum ThemeButton {
    CLEAR = 'clear',
    CLEAR_INVERTED = 'clearInverted',
    OUTLINE = 'outline',
    OUTLINE_RED = 'outline-red',
    OUTLINE_GREEN = 'outline-green',
    BACKGROUND = 'background',
    BACKGROUND_INVERTED = 'backgroundInverted'
}

export enum ButtonSize {
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl'
}

interface PropsButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ThemeButton;
    square?: boolean;
    size?: ButtonSize;
    disabled?: boolean;
    border?: string;
    center?: boolean;
    fullWidth?: boolean;
}

export const Button = memo((props: PropsButton) => {
    const {
        className,
        children,
        theme = ThemeButton.OUTLINE,
        square,
        size = ButtonSize.M,
        disabled,
        border,
        fullWidth,
        center = false,
        ...otherProps
    } = props;

    const mods: Mods = {
        [cls.square]: square,
        [cls.disabled]: disabled,
        [cls.center]: center,
        [cls.fullWidth]: fullWidth,
    };

    const styles = useMemo<CSSProperties>(() => ({
        borderRadius: border,
    }), [border]);

    return (
        <button
            type="button"
            className={classNames(cls.button, mods, [className, cls[theme], cls[size]])}
            {...otherProps}
            disabled={disabled}
            style={styles}
        >
            {children}
        </button>
    );
});
