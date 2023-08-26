import { Currency } from 'entities/Currency/model/types/types';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'shared/ui/Select/Select';

interface CurrencySelectProps {
    value?: string;
    onChange?: (value: Currency) => void;
    readonly?: boolean;
    className?: string;
}

const options = [
    { value: Currency.UAH, content: Currency.UAH },
    { value: Currency.EUR, content: Currency.EUR },
    { value: Currency.USD, content: Currency.USD },
];

export const CurrencySelect = ({
    value, onChange, readonly, className,
}: CurrencySelectProps) => {
    const { t } = useTranslation();

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Currency);
    }, [onChange]);

    return (
        <Select
            label={t('Оберіть валюту')}
            value={value}
            onChange={onChangeHandler}
            options={options}
            readonly={readonly}
            className={className}
        />
    );
};
