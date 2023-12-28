import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { HStack } from 'shared/ui/Stack/HStack/HStack';
import { Text } from 'shared/ui/Text/Text';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { getProfileData } from '../../model/selectors/getProfileData';
import { getProfileReadOnly } from '../../model/selectors/getProfileReadOnly';
import { profileActions } from '../../model/slice/profileSlice';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import cls from './EditableProfileCardHeader.module.scss';

interface EditableProfileCardHeaderProps {
    className?: string;
}

export const EditableProfileCardHeader = memo((props: EditableProfileCardHeaderProps) => {
    const { className } = props;
    const { t } = useTranslation('profile');

    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileData);
    const canEdit = authData?.id === profileData?.id;

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
        <HStack
            justify="between"
            className={classNames(cls.EditableProfileCardHeader, {}, [className])}
        >
            <Text title={t('Профіль')} />
            {readonly ? (
                <Button
                    className={cls.headerBtn}
                    theme={ThemeButton.OUTLINE}
                    onClick={onEdit}
                >
                    {t('Редагувати')}
                </Button>
            ) : (
                <HStack gap="10">
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
                </HStack>
            )}
        </HStack>
    );
});
