import { classNames } from 'shared/lib/classNames/classNames';

import cls from './ArticleCodeBlockComponent.module.scss';

interface ArticleCodeBlockComponentComponentProps {
    className?: string;
}

export const ArticleCodeBlockComponent = ({
    className,
}: ArticleCodeBlockComponentComponentProps) => {
    1;

    return (
        <div className={classNames(cls.ArticleCodeBlockComponent, {}, [className])}>1</div>
    );
};
