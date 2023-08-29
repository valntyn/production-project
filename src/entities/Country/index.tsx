import { Country } from './model/types/types';
import { CountrySelect } from './ui/Country';

export { Country, CountrySelect };


import {classNames} from 'shared/lib/classNames/classNames';

interface Props {
    className?: string;
}

export const NEW = ({className}: Props) => {
    return (
        <div className={classNames(cls, {}, [className])}></div>
    );
};
