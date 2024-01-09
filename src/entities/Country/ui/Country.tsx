import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { ListBox } from 'shared/ui/Popups/components/ListBox/ListBox';

import { Country } from '../consts/consts';

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
        <ListBox
            defaultValue={t('Країна')}
            label={t('Країна')}
            readonly={readonly}
            onChange={onChangeHandler}
            items={options}
            className={className}
            value={value}
            direction="bottom right"
        />
    );
};
