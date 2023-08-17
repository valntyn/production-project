import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { memo, useCallback, useEffect } from 'react';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { ReduxStoreWithManager } from 'app/providers/StoreProvider';
import {
    DynamicModuleLoader, ReducersList,
} from 'shared/lib/components/DynamicModule/DynamicModuleLoader';

import {
    getLoginUsername,
} from '../../model/selectors/getLoginUsername/getLoginUsername';
import {
    getLoginPassword,
} from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import {
    getLoginLoading,
} from '../../model/selectors/getLoginLoading/getLoginLoading';
import { loginByUserName } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';

export interface LoginFormProps {
    className?: string;
}

const initialReducers: ReducersList = {
    login: loginReducer,
};

const LoginForm = memo(({ className }: LoginFormProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const store = useStore() as ReduxStoreWithManager;
    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const error = useSelector(getLoginError);
    const isLoading = useSelector(getLoginLoading);

    useEffect(() => {
        store.reducerManager.add('login', loginReducer);

        return () => {
            store.reducerManager.remove('login');
        };
    }, [store.reducerManager]);

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
        <DynamicModuleLoader
            removeAfterMount
            reducers={initialReducers}
        >
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
        </DynamicModuleLoader>
    );
});

export default LoginForm;
