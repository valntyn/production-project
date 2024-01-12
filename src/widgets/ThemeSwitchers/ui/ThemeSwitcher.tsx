import { memo } from 'react';
import { Theme, useTheme } from '@/app/providers/ThemeProvider';
import { classNames } from '@/shared/lib/classNames/classNames';
import LightIcon from '@/shared/assets/icons/theme-light.svg';
import DarkIcon from '@/shared/assets/icons/theme-dark.svg';

import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import cls from './ThemeSwitcher.module.scss';

interface PropsThemeSwitcher {
    className?: string;
}

export const ThemeSwitcher = memo(({ className }: PropsThemeSwitcher) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            theme={ThemeButton.CLEAR}
            className={classNames(cls.themeSwitcher, {}, [className])}
            onClick={toggleTheme}
        >
            {theme !== Theme.LIGHT ? <DarkIcon /> : <LightIcon />}
        </Button>
    );
});
