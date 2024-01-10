import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { Code } from '@/shared/ui/Code/Code';
import { ArticleCodeBlock } from '../../model/types/article';

import cls from './ArticleCodeBlockComponent.module.scss';

interface ArticleCodeBlockComponentComponentProps {
    className?: string;
    block: ArticleCodeBlock;
}

export const ArticleCodeBlockComponent = memo(({
    className, block,
}: ArticleCodeBlockComponentComponentProps) => (
    <div
        className={classNames(cls.ArticleCodeBlockComponent, {}, [className])}
    >
        <Code text={block.code} />
    </div>
));
