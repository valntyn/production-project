import { getUserAuthData } from './model/selectors/getUserAuthData';
import { userReducer, userActions } from './model/slice/userSlice';
import type { UserSchema, User } from './model/types/user';

export {
    userReducer, userActions, User, UserSchema, getUserAuthData,
};
