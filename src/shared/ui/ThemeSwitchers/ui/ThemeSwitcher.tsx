import {useTheme} from 'app/providers/ThemeProvider';
import {classNames} from 'shared/lib/classNames/classNames';
import cls from './ThemeSwitcher.module.scss';

interface PropsThemeSwitcher {
    className?: string;
}

export const ThemeSwitcher = ({className}: PropsThemeSwitcher) => {
    const {theme, toggleTheme} = useTheme();

    console.log(className);

    return (
        <button
            className={classNames(cls.themeSwitcher, {}, [className])}
            onClick={toggleTheme}
        >
            TOGGLE
        </button>
    );
};
