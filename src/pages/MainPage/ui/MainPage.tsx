import { BugButton } from 'app/providers/ErrorBoundary';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const MainPage = memo(() => {
    const { t } = useTranslation('main');

    return (
        <div>
            <BugButton />
            {t('Головна')}
        </div>
    );
});

export default MainPage;
