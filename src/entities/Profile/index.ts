import { fetchProfileData } from './model/services/fetchProfileData/fetchProfileData';
import { profileActions, profileReducer } from './model/slice/profileSlice';
import { ProfileCard } from './ui/ProfileCard/ProfileCard';

export {
    Profile,
    ProfileSchema,
} from './model/types/profile';

export {
    profileActions,
    profileReducer,
    fetchProfileData,
    ProfileCard,
};
