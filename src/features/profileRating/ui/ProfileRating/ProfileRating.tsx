import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ProfileRating.module.scss';
import { RatingCard } from '@/entities/Rating';
import { getUserAuthData } from '@/entities/User';
import { useGetProfileRating, usePostProfileRating } from '../../api/profileRatingApi';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

interface ProfileRatingProps {
    className?: string;
    profileId: string;
}

export const ProfileRating = memo((props: ProfileRatingProps) => {
    const { className, profileId } = props;
    const { t } = useTranslation();

    const userData = useSelector(getUserAuthData);

    const { data, isLoading } = useGetProfileRating({
        profileId, userId: userData?.id ?? '',
    });

    const [postProfileRating] = usePostProfileRating();

    const handleRateProfile = useCallback((starsCount: number, feedback?: string) => {
        postProfileRating({
            userId: userData?.id ?? '',
            profileId,
            rate: starsCount,
            feedback,
        });
    }, [postProfileRating, profileId, userData?.id]);

    const onCancel = useCallback((starsCount: number) => {
        handleRateProfile(starsCount);
    }, [handleRateProfile]);

    const onAccept = useCallback((starsCount: number, feedback?: string) => {
        handleRateProfile(starsCount, feedback);
    }, [handleRateProfile]);

    if (profileId === userData?.id) {
        return null;
    }

    if (isLoading) {
        return <Skeleton width="200px" height="120px" border="5%" />;
    }

    const rating = data?.[0];

    return (
        <RatingCard
            hasFeedback
            onCancel={onCancel}
            onAccept={onAccept}
            rate={rating?.rate}
            title={t('Залиште відгук користувачу')}
            feedbackTitle={t('Відгук')}
            className={classNames(cls.ProfileRating, {}, [className])}
        />
    );
});
