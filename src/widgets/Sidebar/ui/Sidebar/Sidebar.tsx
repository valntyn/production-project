import { classNames } from 'shared/lib/classNames/classNames';
import {
    memo, useCallback, useEffect, useState,
} from 'react';
import { ThemeSwitcher } from 'widgets/ThemeSwitchers';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { useSelector } from 'react-redux';
import { getSidebarItems } from 'widgets/Sidebar/model/selectors/getSidebarItems';
import { useHover } from 'shared/lib/hooks/useHover';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import StaticIcon from 'shared/assets/icons/static-menu.svg';

import { VStack } from 'shared/ui/Stack/VStack/VStack';
import { HStack } from 'shared/ui/Stack/HStack/HStack';
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
            <VStack gap="10" className={cls.navItems}>
                {sideBarItemsList.map((item) => (
                    <SidebarItem
                        item={item}
                        key={item.path}
                        collapsed={collapsed}
                    />
                ))}
            </VStack>
            <HStack
                gap="16"
                align="center"
                justify="center"
                className={cls.switches}
            >
                <ThemeSwitcher />
                <LangSwitcher className={cls.lang} short={collapsed} />
                {!collapsed
                    && (
                        <Button
                            onClick={onFixedChange}
                            theme={ThemeButton.CLEAR}
                            center
                        >
                            <StaticIcon className={cls.svgMenu} />
                        </Button>
                    )}
            </HStack>
        </menu>
    );
});
