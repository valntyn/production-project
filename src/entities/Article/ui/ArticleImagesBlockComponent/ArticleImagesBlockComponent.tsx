import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';

import cls from './ArticleImagesBlockComponent.module.scss';

interface ArticleImagesBlockComponentProps {
    className?: string;
}

export const ArticleImagesBlockComponent = ({ className }: ArticleImagesBlockComponentProps) => {
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.ArticleImagesBlockComponent, {}, [className])}>1</div>
    );
};
