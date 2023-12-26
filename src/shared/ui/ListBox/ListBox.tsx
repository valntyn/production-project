import { Listbox as HListBox } from '@headlessui/react';
import { Fragment, memo, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { HStack } from 'shared/ui/Stack/HStack/HStack';
import { Button } from '../Button/Button';
import cls from './ListBox.module.scss';

type DropdownDirection = 'top' | 'bottom';

export interface ListBoxItem {
    value: string;
    id?: number;
    content: ReactNode;
    disabled?: boolean;
}

interface ListBoxProps {
    items: ListBoxItem[];
    className?: string;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    readonly?: boolean;
    direction?: DropdownDirection;
    label?: string;
}

const mapDirectionClass: Record<DropdownDirection, string> = {
    bottom: cls.optionBottom,
    top: cls.optionTop,
};

export const ListBox = memo((props: ListBoxProps) => {
    const {
        className,
        items,
        value,
        onChange,
        defaultValue,
        readonly,
        label,
        direction = 'bottom',
    } = props;

    const optionClasses = [mapDirectionClass[direction]];

    return (
        <HStack gap="4" align="center">
            {label && <span>{`${label}>`}</span>}
            <HListBox
                as="div"
                className={classNames(cls.ListBox, { [cls.readonly]: readonly }, [className])}
                value={value}
                onChange={onChange}
                disabled={readonly}
            >
                <HListBox.Button
                    className={cls.trigger}
                >
                    <Button disabled={readonly}>
                        {value ?? defaultValue}
                    </Button>
                </HListBox.Button>
                <HListBox.Options className={classNames(cls.options, {}, optionClasses)}>
                    {items.map((item) => (
                        <HListBox.Option
                            key={item.id}
                            value={item.value}
                            disabled={item.disabled}
                            as={Fragment}
                        >
                            {({ active, selected, disabled }) => (
                                <li className={classNames(cls.item, {
                                    [cls.active]: active,
                                    [cls.disabled]: disabled,
                                    [cls.direction]: direction,
                                }, [])}
                                >
                                    {selected && '!!!'}
                                    {item.content}
                                </li>
                            )}
                        </HListBox.Option>
                    ))}
                </HListBox.Options>
            </HListBox>
        </HStack>
    );
});
