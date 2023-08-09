import {classNames} from 'shared/lib/classNames/classNames';
import cls from './Sidebar.module.scss';
import {useState} from 'react';
import {ThemeSwitcher} from 'shared/ui/ThemeSwitchers';

interface SidebarProps {
    className?: string;
}

export const Sidebar = ({className}: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);

    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };

    return (
        <div
            className={classNames(
                cls.sidebar,
                {
                    [cls.collapsed]: collapsed,
                },
                [className]
            )}
        >
            <button onClick={onToggle}>toggle</button>
            <div className={cls.switches}>
                <ThemeSwitcher />
            </div>
        </div>
    );
};
