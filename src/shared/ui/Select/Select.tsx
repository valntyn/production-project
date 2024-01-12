import { ChangeEvent, useMemo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';

import cls from './Select.module.scss';

export interface SelectOption<T> {
    value: T;
    content: string;
}

interface SelectProps<T extends string> {
    className?: string;
    label?: string;
    options?: SelectOption<T>[];
    value?: T;
    onChange?: (value: T) => void;
    readonly?: boolean;
}

export const Select = <T extends string>(props: SelectProps<T>) => {
    const {
        className,
        onChange,
        value,
        options,
        label,
        readonly,
    } = props;

    const optionList = useMemo(() => options?.map((opt) => (
        <option
            className={cls.option}
            value={opt.value}
            key={opt.value}
        >
            {opt.content}

        </option>
    )), [options]);

    const mods: Mods = {};

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        if (onChange) {
            onChange(e.target.value as T);
        }
    };

    return (
        <div className={classNames(cls.Wrapper, mods, [className])}>
            {label && (
                <span
                    className={cls.label}
                >
                    {`${label}`}
                </span>
            )}
            <select
                className={cls.select}
                onChange={onChangeHandler}
                value={value}
                disabled={readonly}
            >
                {optionList}
            </select>
        </div>
    );
};
