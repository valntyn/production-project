import { Popover as HPopover } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ReactNode } from 'react';
import { DropdownDirection } from 'shared/types/ui';
import { mapDirectionClass } from '../styles/const';
import popUpCls from '../styles/popup.module.scss';
import cls from './Popover.module.scss';

interface PopoverProps {
    className?: string;
    readonly?: boolean;
    trigger?: ReactNode;
    direction?: DropdownDirection;
    children: ReactNode;
}

export function Popover(props: PopoverProps) {
    const {
        className, readonly, trigger, direction = 'bottom right', children,
    } = props;

    const menuClasses = [mapDirectionClass[direction]];

    return (
        <HPopover
            className={
                classNames('', { [popUpCls.readonly]: readonly }, [className, popUpCls.popup])
            }
        >
            <HPopover.Button className={popUpCls.trigger}>{trigger}</HPopover.Button>

            <HPopover.Panel
                className={
                    classNames(cls.panel, {}, menuClasses)
                }
            >
                {children}
            </HPopover.Panel>
        </HPopover>
    );
}
