import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ListBox } from 'shared/ui/Popups/components/ListBox/ListBox';

import { Currency } from '../../consts/consts';

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
        <ListBox
            readonly={readonly}
            value={value}
            onChange={onChangeHandler}
            items={options}
            label={t('Оберіть валюту')}
            defaultValue={t('Оберіть валюту')}
            direction="top right"
            className={className}
        />
    );
};
