import { classNames } from 'shared/lib/classNames/classNames';
import './PageLoader.scss';
import { Spinner } from 'shared/ui/Spinner/Spinner';

interface Props {
    className?: string;
}

export const PageLoader = ({ className }: Props) => (
    <div className={classNames('loader', {}, [className])}>
        <Spinner />
    </div>
);
