import { Mods, classNames } from 'shared/lib/classNames/classNames';
import { CSSProperties, useMemo } from 'react';

import cls from './Photo.module.scss';

interface PhotoProps {
    className?: string;
    src?: string;
    alt?: string;
    size?: number;
}

export const Photo = ({
    className, src, alt, size,
}: PhotoProps) => {
    const mods: Mods = {};

    const styles = useMemo<CSSProperties>(() => ({
        width: size || 100,
        height: size || 100,
    }), [size]);

    return (
        <img
            src={src}
            alt={alt}
            style={styles}
            className={classNames(cls.Photo, mods, [className])}
        />
    );
};
