import { Fragment, memo, ReactNode } from 'react';
import { Menu } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';
import { DropdownDirection } from 'shared/types/ui';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import cls from './MenuDropdown.module.scss';

export interface DropdownItem {
    disabled?: boolean;
    content?: ReactNode;
    onClick?: () => void;
    href?: string;
}

interface MenuProps {
    className?: string;
    readonly?: boolean;
    items: DropdownItem[];
    trigger?: ReactNode;
    direction?: DropdownDirection;
}

// todo combine functionality later
const mapDirectionClass: Record<DropdownDirection, string> = {
    'bottom left': cls.optionBottomLeft,
    'bottom right': cls.optionBottomRight,
    'top left': cls.optionTopLeft,
    'top right': cls.optionTopRight,
};

export const MenuDropdown = memo((props: MenuProps) => {
    const {
        className, readonly, items, trigger, direction = 'bottom left',
    } = props;

    const menuClasses = [mapDirectionClass[direction]];

    return (
        <Menu
            as="menu"
            className={classNames(cls.Menu, { [cls.readonly]: readonly }, [className])}
        >
            <Menu.Button
                className={cls.trigger}
            >
                {trigger ?? 'Open'}
            </Menu.Button>
            <Menu.Items
                className={
                    classNames(
                        cls.items,
                        { [cls.readonly]: readonly },
                        menuClasses,
                    )
                }
                as="ul"
            >
                {items.map((item) => {
                    const content = ({ active }: { active: boolean }) => (
                        <button
                            type="button"
                            onClick={item.onClick}
                            disabled={item.disabled}
                            className={classNames(
                                cls.item,
                                { [cls.active]: active },
                                [className],
                            )}
                        >
                            {item.content}
                        </button>
                    );

                    if (item.href) {
                        return (
                            <Menu.Item as={AppLink} to={item.href}>
                                {content}
                            </Menu.Item>
                        );
                    }

                    return (
                        <Menu.Item as={Fragment}>
                            {content}
                        </Menu.Item>
                    );
                })}
            </Menu.Items>
        </Menu>
    );
});
