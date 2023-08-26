import { Mods, classNames } from 'shared/lib/classNames/classNames';
import { ChangeEvent, memo, useMemo } from 'react';

import cls from './Select.module.scss';

export interface SelectOption {
    value: string;
    content: string;
}

interface SelectProps {
    className?: string;
    label?: string;
    options?: SelectOption[];
    value?: string;
    onChange?: (value: string) => void;
    readonly?: boolean;
}

export const Select = memo((props: SelectProps) => {
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

    const mods: Mods = {

    };

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        if (onChange) {
            onChange(e.target.value);
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
});
