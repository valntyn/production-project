import { Currency } from 'entities/Currency';

export interface Profile {
    id?: string;
    first?: string;
    lastname?: string;
    age?: string | number;
    currency?: Currency;
    country?: string;
    city?: string;
    username?: string;
    avatar?: string;
}
