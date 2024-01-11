import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { BugButton } from '@/app/providers/ErrorBoundary';
import { Page } from '@/widgets/Page/Page';
import { StarRating } from '@/shared/ui/StarRating/StarRating';
import { RatingCard } from '@/entities/Rating';

const MainPage = memo(() => {
    const { t } = useTranslation('main');

    return (
        <Page>
            <BugButton />
            {t('Головна')}
            <StarRating size={50} />
            <RatingCard
                title="Як вам стаття?"
                feedbackTitle="Залиште відгук"
                hasFeedback
            />
        </Page>
    );
});

export default MainPage;
