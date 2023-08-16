import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { getLoginState } from 'features/AuthByUserName/model/selectors/getLoginState/getLoginState';
import { Text, TextTheme } from 'shared/ui/Text/Text';

import { loginByUserName } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string;
}

export const LoginForm = memo(({ className }: LoginFormProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const {
        username, password, error, isLoading,
    } = useSelector(getLoginState);

    const onChangeUserName = useCallback((value: string) => {
        dispatch(loginActions.setUserName(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);

    const onLogingClick = useCallback(() => {
        dispatch(loginByUserName({ username, password }));
    }, [dispatch, password, username]);

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <Text title={t('Aвторізація')} />
            {error && (
                <Text
                    text={error}
                    theme={TextTheme.ERROR}
                />
            )}
            <Input
                autofocus
                placeholder={t('Введи username')}
                className={cls.input}
                type="text"
                onChange={onChangeUserName}
                value={username}
            />
            <Input
                placeholder={t('Введи пароль')}
                className={cls.input}
                type="text"
                onChange={onChangePassword}
                value={password}
            />
            <Button
                onClick={onLogingClick}
                theme={ThemeButton.OUTLINE}
                disabled={isLoading}
            >
                {t('Вхід')}
            </Button>
        </div>
    );
});
