import { classNames } from '@/shared/lib/classNames/classNames';
import './Spinner.scss';
import { memo } from 'react';

interface SpinnerProps {
    className?: string;
}

export const Spinner = memo(({ className }: SpinnerProps) => (
    <div className={classNames('lds-ellipsis', {}, [className])}>
        <div />
        <div />
        <div />
        <div />
    </div>
));
