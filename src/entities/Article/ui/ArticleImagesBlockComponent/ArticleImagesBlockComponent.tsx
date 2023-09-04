import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { ArticleImageBlock } from 'entities/Article/model/types/article';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { Photo } from 'shared/ui/Photo/Photo';

import cls from './ArticleImagesBlockComponent.module.scss';

interface ArticleImagesBlockComponentProps {
    className?: string;
    block: ArticleImageBlock
}

export const ArticleImagesBlockComponent = memo(({
    className,
    block,
}: ArticleImagesBlockComponentProps) => {
    const { t } = useTranslation();

    return (
        <div
            className={classNames(cls.ArticleImagesBlockComponent, {}, [className])}
        >
            <Photo src={block.src} className={cls.img} alt={block.src} size={400} />
            {block.title && (
                <Text text={block.title} align={TextAlign.CENTER} />
            )}
        </div>
    );
});
