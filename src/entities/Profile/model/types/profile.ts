export interface Profile {
    first?: string
    lastname?: string
    age?: string | number
    currency?: string
    country?: string
    city?: string
    username?: string
    avatar?: string
}

export interface ProfileSchema {
    data?: Profile;
    form?: Profile;
    isLoading: boolean;
    error?: string;
    readonly: boolean;
}
