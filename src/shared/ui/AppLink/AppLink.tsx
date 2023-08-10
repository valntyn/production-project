import { classNames } from 'shared/lib/classNames/classNames';
import { FC } from 'react';
import { LinkProps, Link } from 'react-router-dom';

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
        theme = AppLinkTheme.PRIMARY,
        ...otherProps
    } = props;

    return (
        <Link
            to={to}
            className={classNames(cls.appLink, {}, [className, cls[theme]])}
        >
            {children}
        </Link>
    );
};
