import { classNames } from 'shared/lib/classNames/classNames';
import { t } from 'i18next';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui/Text/Text';
import { useSelector } from 'react-redux';
import { getProfileReadOnly, profileActions, updateProfileData } from 'entities/Profile';
import { useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';

import cls from './ProfilePageHeader.module.scss';

interface ProfilePageHeaderProps {
    className?: string;
}

export const ProfilePageHeader = ({ className }: ProfilePageHeaderProps) => {
    const { t } = useTranslation('profile');

    const readonly = useSelector(getProfileReadOnly);
    const dispatch = useAppDispatch();

    const onEdit = useCallback(() => {
        dispatch(profileActions.setReadonly(false));
    }, [dispatch]);

    const onCancelEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onSave = useCallback(() => {
        dispatch(updateProfileData());
        onCancelEdit();
    }, [dispatch, onCancelEdit]);

    return (
        <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
            <Text title={t('Профіль')} />
            <div className={cls.buttonWrapper}>
                {readonly ? (
                    <Button
                        className={cls.headerBtn}
                        theme={ThemeButton.OUTLINE}
                        onClick={onEdit}
                    >
                        {t('Редагувати')}
                    </Button>
                ) : (
                    <div className={cls.editButtonWrapper}>
                        <Button
                            className={cls.headerBtn}
                            theme={ThemeButton.OUTLINE_GREEN}
                            onClick={onSave}
                        >
                            {t('Зберегти')}
                        </Button>
                        <Button
                            className={cls.headerBtn}
                            theme={ThemeButton.OUTLINE_RED}
                            onClick={onCancelEdit}
                        >
                            {t('Скасувати')}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};
