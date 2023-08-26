import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'shared/ui/Select/Select';

import { Country } from '../model/types/types';

interface CountrySelectProps {
    value?: string;
    onChange?: (value: Country) => void;
    readonly?: boolean;
    className?: string;
}

const options = [
    { value: Country.Ukraine, content: Country.Ukraine },
    { value: Country.Belgium, content: Country.Belgium },
    { value: Country.USA, content: Country.USA },
];

export const CountrySelect = ({
    value, onChange, readonly, className,
}: CountrySelectProps) => {
    const { t } = useTranslation();

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Country);
    }, [onChange]);

    return (
        <Select
            label={t('Країна')}
            value={value}
            onChange={onChangeHandler}
            options={options}
            readonly={readonly}
            className={className}
        />
    );
};
