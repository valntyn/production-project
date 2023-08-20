/* eslint-disable react/jsx-props-no-spreading */
import { Mods, classNames } from 'shared/lib/classNames/classNames';
import { ButtonHTMLAttributes, FC, memo } from 'react';

import cls from './Button.module.scss';

export enum ThemeButton {
    CLEAR = 'clear',
    CLEAR_INVERTED = 'clearInverted',
    OUTLINE = 'outline',
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
}

export const Button = memo((props: PropsButton) => {
    const {
        className,
        children,
        theme = ThemeButton.OUTLINE,
        square,
        size = ButtonSize.M,
        disabled,
        ...otherProps
    } = props;

    const mods: Mods = {
        [cls.square]: square,
        [cls.disabled]: disabled,
    };

    return (
        <button
            type="button"
            className={classNames(cls.button, mods, [className, cls[theme], cls[size]])}
            {...otherProps}
            disabled={disabled}
        >
            {children}
        </button>
    );
});
