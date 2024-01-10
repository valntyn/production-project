import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Page } from '@/widgets/Page/Page';

import cls from './GuardPage.module.scss';

interface Props {
    className?: string;
}

export const GuardPage = memo(({ className }: Props) => {
    const { t } = useTranslation();

    return (
        <Page className={classNames(cls.GuardPage, {}, [className])}>
            {t('У вас немає доступу')}
        </Page>
    );
});
