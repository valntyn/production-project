import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { User, userActions } from 'entities/User';
import i18n from 'shared/config/i18n/i18n';
import { USER_LOCALSTORAGE_KEY } from 'shared/constants/localstorage';

interface LoginByUserNameProps {
    username: string;
    password: string;
}

export const loginByUserName = createAsyncThunk<User, LoginByUserNameProps, ThunkConfig<string>>(
    'users/fetchByIdStatus',
    async (authData, thunkApi) => {
        const {
            extra,
            dispatch,
            rejectWithValue,
        } = thunkApi;

        try {
            const response = await extra.api
                .post<User>('/login', authData);

            if (!response.data) {
                throw new Error();
            }

            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
            dispatch(userActions.setAuthData(response.data));
            extra.navigate('/about');

            return response.data;
        } catch (e) {
            return rejectWithValue(i18n.t('ввели неправильний логін чи пароль'));
        }
    },
);
