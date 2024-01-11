import { useTranslation } from 'react-i18next';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Text, TextAlign, TextTheme } from '@/shared/ui/Text/Text';
import { Input } from '@/shared/ui/Input/Input';
import { Spinner } from '@/shared/ui/Spinner/Spinner';
import { Photo } from '@/shared/ui/Photo/Photo';
import { Currency, CurrencySelect } from '@/entities/Currency';
import { Country, CountrySelect } from '@/entities/Country';
import { VStack } from '@/shared/ui/Stack/VStack/VStack';
import { Profile } from '../../model/types/profile';

import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
    className?: string;
    error?: string;
    isLoading?: boolean;
    data?: Profile;
    readonly?: boolean;
    onChangeFirstName?: (value?: string) => void;
    onChangeLastName?: (value?: string) => void;
    onChangeAge?: (value?: string) => void;
    onChangeCity?: (value?: string) => void;
    onChangeUsername?: (value?: string) => void;
    onChangeAvatar?: (value?: string) => void;
    onChangeCurrency?: (value?: Currency) => void;
    onChangeCountry?: (value?: Country) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
    const {
        className,
        data,
        isLoading,
        error,
        onChangeLastName,
        onChangeFirstName,
        readonly,
        onChangeCity,
        onChangeAge,
        onChangeAvatar,
        onChangeUsername,
        onChangeCountry,
        onChangeCurrency,
    } = props;

    const { t } = useTranslation('profile');

    if (isLoading) {
        return (
            <div className={classNames(cls.ProfileCard, { [cls.loading]: true }, [className])}>
                <Spinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className={classNames(cls.ProfileCard, {}, [className, error])}>
                <Text
                    align={TextAlign.CENTER}
                    theme={TextTheme.ERROR}
                    title={t('Виникла помилка')}
                    text={t('Оновить сторінку')}
                />
            </div>
        );
    }

    const mods: Mods = {
        [cls.editing]: !readonly,
    };

    return (
        <div className={classNames(cls.ProfileCard, mods, [className])}>
            <div className={cls.data}>
                <div className={cls.PhotoWrapper}>
                    {data?.avatar && (
                        <Photo
                            src={data?.avatar}
                            alt="profile"
                        />
                    )}
                </div>
                <VStack gap="10">
                    <Input
                        value={data?.first}
                        placeholder={t('Ваше ім\'я')}
                        className={cls.input}
                        onChange={onChangeFirstName}
                        readonly={readonly}
                    />
                    <Input
                        value={data?.lastname}
                        placeholder={t('Ваша фамілія')}
                        className={cls.input}
                        onChange={onChangeLastName}
                        readonly={readonly}
                    />
                    <Input
                        value={data?.age}
                        placeholder={t('Ваш вік')}
                        className={cls.input}
                        onChange={onChangeAge}
                        readonly={readonly}
                    />
                    <Input
                        value={data?.city}
                        placeholder={t('Ваше місто')}
                        className={cls.input}
                        onChange={onChangeCity}
                        readonly={readonly}
                    />
                    <Input
                        value={data?.username}
                        placeholder={t('Ваш username')}
                        className={cls.input}
                        onChange={onChangeUsername}
                        readonly={readonly}
                    />
                    <Input
                        value={data?.avatar}
                        placeholder={t('Ваше фото')}
                        className={cls.input}
                        onChange={onChangeAvatar}
                        readonly={readonly}
                    />
                    <CurrencySelect
                        className={cls.input}
                        value={data?.currency}
                        onChange={onChangeCurrency}
                        readonly={readonly}
                    />
                    <CountrySelect
                        className={cls.input}
                        value={data?.country}
                        onChange={onChangeCountry}
                        readonly={readonly}
                    />
                </VStack>
            </div>
        </div>
    );
};
