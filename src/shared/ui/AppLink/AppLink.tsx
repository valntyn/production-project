import { FC } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './AppLink.module.scss';

export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
}

interface PropsAppLink extends LinkProps {
    className?: string;
    theme?: AppLinkTheme;
}

export const AppLink: FC<PropsAppLink> = (props) => {
    const {
        to,
        className,
        children,
        target,
        theme = AppLinkTheme.PRIMARY,
        ...otherProps
    } = props;

    return (
        <Link
            to={to}
            target={target}
            className={classNames(cls.appLink, {}, [className, cls[theme]])}
        >
            {children}
        </Link>
    );
};
