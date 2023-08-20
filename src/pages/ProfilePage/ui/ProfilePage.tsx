import { ProfileCard, fetchProfileData, profileReducer } from 'entities/Profile';
import { memo, useEffect } from 'react';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModule/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';

const reducers: ReducersList = {
    profile: profileReducer,
};

interface Props {
    className?: string;
}

const ProfilePage = memo(({ className }: Props) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProfileData());
    }, [dispatch]);

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterMount
        >
            <ProfileCard />
        </DynamicModuleLoader>
    );
});

export default ProfilePage;
