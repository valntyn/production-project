import { classNames } from 'shared/lib/classNames/classNames';
import {
    memo, useCallback, useEffect, useState,
} from 'react';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitchers';
import { LangSwitcher } from 'shared/ui/LangSwitcher';
import { useSelector } from 'react-redux';
import { getSidebarItems } from 'widgets/Sidebar/model/selectors/getSidebarItems';
import { useHover } from 'shared/lib/hooks/useHover';
import { Button } from 'shared/ui/Button/Button';

import cls from './Sidebar.module.scss';
import { SidebarItem } from '../SidebarItem/SidebarItem';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const [isFixed, setIsFixed] = useState(true);
    const [isHover, bindHover] = useHover();
    const sideBarItemsList = useSelector(getSidebarItems);

    useEffect(() => {
        setCollapsed((prev) => !prev);
    }, [isHover]);

    const onFixedChange = useCallback(() => {
        setIsFixed((prev) => !prev);
        setCollapsed(false);
    }, []);

    return (
        <menu
            {...isFixed && { ...bindHover }}
            className={classNames(
                cls.sidebar,
                {
                    [cls.collapsed]: collapsed,
                },
                [className],
            )}
        >
            <div className={cls.navItems}>
                {sideBarItemsList.map((item) => (
                    <SidebarItem
                        item={item}
                        key={item.path}
                        collapsed={collapsed}
                    />
                ))}
            </div>
            <div className={cls.switches}>
                <ThemeSwitcher />
                <LangSwitcher className={cls.lang} short={collapsed} />
                {!collapsed && <Button onClick={onFixedChange} />}
            </div>
        </menu>
    );
});
