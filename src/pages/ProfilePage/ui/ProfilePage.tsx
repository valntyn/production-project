import {
    fetchProfileData,
    getProfileError,
    getProfileErrorValidator,
    getProfileForm,
    getProfileLoading,
    getProfileReadOnly,
    profileActions,
    ProfileCard,
    profileReducer,
} from 'entities/Profile';
import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModule/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { useParams } from 'react-router-dom';

import { VStack } from 'shared/ui/Stack/VStack/VStack';
import { Page } from 'widgets/Page/Page';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';

const reducers: ReducersList = {
    profile: profileReducer,
};

interface Props {
    className?: string;
}

const ProfilePage = memo(({ className }: Props) => {
    const form = useSelector(getProfileForm);
    const isLoading = useSelector(getProfileLoading);
    const error = useSelector(getProfileError);
    const readonly = useSelector(getProfileReadOnly);
    const validateErrors = useSelector(getProfileErrorValidator);
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            dispatch(fetchProfileData(id));
        }
    }, [dispatch, id]);

    const onChangeFirstName = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ first: value }));
    }, [dispatch]);

    const onChangeLastName = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ lastname: value }));
    }, [dispatch]);

    const onChangeCity = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ city: value }));
    }, [dispatch]);

    const onChangeAvatar = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ avatar: value }));
    }, [dispatch]);

    const onChangeUsername = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ username: value }));
    }, [dispatch]);

    const onChangeCurrency = useCallback((value?: Currency) => {
        dispatch(profileActions.updateProfile({ currency: value }));
    }, [dispatch]);

    const onChangeCountry = useCallback((value?: Country) => {
        dispatch(profileActions.updateProfile({ country: value }));
    }, [dispatch]);

    const onChangeAge = useCallback((value?: string) => {
        if (value) {
            const numbers = value.replace(/[^0-9.]/g, '');

            const parsedValue = parseFloat(numbers);

            dispatch(profileActions.updateProfile({
                age: Number.isNaN(parsedValue)
                    ? ''
                    : parsedValue,
            }));
        }
    }, [dispatch]);

    return (
        <Page>
            <DynamicModuleLoader
                reducers={reducers}
                removeAfterMount
            >
                <VStack>
                    <ProfilePageHeader />
                    {!!validateErrors?.length && validateErrors.map((el) => (
                        <Text
                            theme={TextTheme.ERROR}
                            text={el}
                            key={el}
                        />
                    ))}
                    <ProfileCard
                        data={form}
                        error={error}
                        isLoading={isLoading}
                        onChangeFirstName={onChangeFirstName}
                        onChangeLastName={onChangeLastName}
                        onChangeCity={onChangeCity}
                        onChangeAge={onChangeAge}
                        onChangeAvatar={onChangeAvatar}
                        onChangeUsername={onChangeUsername}
                        onChangeCurrency={onChangeCurrency}
                        onChangeCountry={onChangeCountry}
                        readonly={readonly}
                    />
                </VStack>
            </DynamicModuleLoader>
        </Page>
    );
});

export default ProfilePage;
