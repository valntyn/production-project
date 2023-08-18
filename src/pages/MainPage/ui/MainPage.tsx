import { BugButton } from 'app/providers/ErrorBoundary';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from 'shared/ui/Input/Input';

const MainPage = memo(() => {
    const { t } = useTranslation('main');
    const [value, setValue] = useState('');

    const onChange = (val: string) => {
        setValue(val);
    };

    return (
        <div>
            <BugButton />
            <Input
                value={value}
                onChange={onChange}
                placeholder="введи текст"
            />
            {t('Головна')}
        </div>
    );
});

export default MainPage;
