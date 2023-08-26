import { StateSchema } from 'app/providers/StoreProvider';

export const getProfileErrorValidator = (
    state: StateSchema,
) => state?.profile?.validateErrors || [];
