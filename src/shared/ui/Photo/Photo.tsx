import { CSSProperties, useMemo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';

import cls from './Photo.module.scss';

interface PhotoProps {
    className?: string;
    src?: string;
    alt?: string;
    size?: number;
    border?: string;
}

export const Photo = ({
    className, src, alt, size, border,
}: PhotoProps) => {
    const mods: Mods = {};

    const styles = useMemo<CSSProperties>(() => ({
        width: size || 100,
        height: size || 100,
        borderRadius: border,
    }), [border, size]);

    return (
        <img
            src={src}
            alt={alt}
            style={styles}
            className={classNames(cls.Photo, mods, [className])}
        />
    );
};
