import {classNames} from 'shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';
import {FC} from 'react';
import {LinkProps} from 'react-router-dom';
import {Link} from 'react-router-dom';

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
