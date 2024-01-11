import { Fragment, memo, ReactNode } from 'react';
import { Menu } from '@headlessui/react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import { AppLink } from '../../../AppLink/AppLink';
import { mapDirectionClass } from '../styles/const';
import cls from './MenuDropdown.module.scss';
import popUpCls from '../styles/popup.module.scss';

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

export const MenuDropdown = memo((props: MenuProps) => {
    const {
        className, readonly, items, trigger, direction = 'bottom left',
    } = props;

    const menuClasses = [mapDirectionClass[direction]];

    return (
        <Menu
            as="menu"
            className={
                classNames('', { [popUpCls.readonly]: readonly }, [className, popUpCls.popup])
            }
        >
            <Menu.Button
                className={popUpCls.trigger}
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
                {items.map((item, i) => {
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
                            key={`dropdown-${i}`}
                        >
                            {item.content}
                        </button>
                    );

                    if (item.href) {
                        return (
                            <Menu.Item as={AppLink} to={item.href} key={`dropdown-${i}`}>
                                {content}
                            </Menu.Item>
                        );
                    }

                    return (
                        <Menu.Item as={Fragment} key={`dropdown-${i}`}>
                            {content}
                        </Menu.Item>
                    );
                })}
            </Menu.Items>
        </Menu>
    );
});
