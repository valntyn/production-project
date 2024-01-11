export interface GetProfileRating {
    id: string;
    rate: number;
    feedback: string;
}

export interface GetProfileParams {
    userId: string;
    profileId: string;
}

export interface PostProfileRating {
    userId: string;
    profileId: string;
    rate: number;
    feedback?: string;
}
