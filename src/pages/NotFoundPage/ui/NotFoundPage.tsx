import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';

import cls from './NotFoundPage.module.scss';

interface Props {
    className?: string;
}

export const NotFoundPage = ({ className }: Props) => {
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.NotFoundPage, {}, [className])}>
            {t('Сторінка не знайдена')}
        </div>
    );
};
