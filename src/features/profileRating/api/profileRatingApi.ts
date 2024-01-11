import { rtkApi } from '@/shared/api/rtkApi';
import { GetProfileParams, GetProfileRating, PostProfileRating } from '../model/types/types';

const profileRatingApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getProfileRatings: build.query<GetProfileRating[], GetProfileParams>({
            query: ({ userId, profileId }) => ({
                url: '/profile-ratings',
                params: {
                    userId,
                    profileId,
                },
            }),
        }),
        rateProfile: build.mutation<void, PostProfileRating>({
            query: (body) => ({
                url: '/profile-ratings',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const useGetProfileRating = profileRatingApi.useGetProfileRatingsQuery;
export const usePostProfileRating = profileRatingApi.useRateProfileMutation;
