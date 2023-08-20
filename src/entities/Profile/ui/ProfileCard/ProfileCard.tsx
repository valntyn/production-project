import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getProfileError } from 'entities/Profile/model/selectors/getProfileError';
import { getProfileLoading } from 'entities/Profile/model/selectors/getProfileLoading';
import { getProfileData } from 'entities/Profile/model/selectors/getProfileData';
import { Text } from 'shared/ui/Text/Text';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';

import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
    className?: string;
}

export const ProfileCard = ({ className }: ProfileCardProps) => {
    const { t } = useTranslation('profile');
    const data = useSelector(getProfileData);
    const isLoading = useSelector(getProfileError);
    const error = useSelector(getProfileLoading);

    return (
        <div className={classNames(cls.ProfileCard, {}, [className])}>
            <div className={cls.header}>
                <Text title={t('Профіль')} />
                <Button
                    className={cls.editBtn}
                    theme={ThemeButton.OUTLINE}
                >
                    {t('Редагувати')}
                </Button>
            </div>
            <div className={cls.data}>
                <Input
                    value={data?.first}
                    placeholder={t('Ваше ім\'я')}
                    className={cls.input}
                />
                <Input
                    value={data?.lastname}
                    placeholder={t('Ваша фамілія')}
                    className={cls.input}
                />
            </div>
        </div>
    );
};
