import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';

import cls from './NotFoundPage.module.scss';

interface Props {
    className?: string;
}

export const NotFoundPage = memo(({ className }: Props) => {
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.NotFoundPage, {}, [className])}>
            {t('Сторінка не знайдена')}
        </div>
    );
});
