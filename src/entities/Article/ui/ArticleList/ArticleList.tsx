import { HTMLAttributeAnchorTarget, memo } from 'react';
import { List, ListRowProps, WindowScroller } from 'react-virtualized';
import { Text } from '@/shared/ui/Text/Text';
import { PAGE_ID } from '@/widgets/Page/Page';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import { Article, ArticleView } from '../../model/types/article';

import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import cls from './ArticleList.module.scss';

const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.SMALL ? 9 : 3)
    .fill(0)
    .map((_, i) => (
        <ArticleListItemSkeleton className={cls.card} view={view} key={i} />
    ));

interface ArticleListProps {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    view?: ArticleView;
    target?: HTMLAttributeAnchorTarget;
    virtualized?: boolean;
}

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        className,
        articles,
        view = ArticleView.SMALL,
        isLoading,
        target,
        virtualized = true,
    } = props;
    const isLarge = view === ArticleView.LARGE;
    const itemsPerRow = isLarge ? 1 : 5;
    const rowCount = isLarge ? articles.length : Math.ceil(articles.length / itemsPerRow);

    if (!isLoading && !articles.length) {
        return (
            <Text title="Нема :)" />
        );
    }

    const rowRender = ({
        index, key, style,
    }: ListRowProps) => {
        const items = [];
        const fromIndex = index * itemsPerRow;
        const toIndex = Math.min(fromIndex + itemsPerRow, articles.length);

        for (let i = fromIndex; i < toIndex; i += 1) {
            items.push(
                <ArticleListItem
                    article={articles[index]}
                    view={view}
                    className={cls.card}
                    target={target}
                    key={articles[index].id}
                />,
            );
        }

        return (
            <div
                key={key}
                style={style}
                className={cls.row}
            >
                {items}
            </div>
        );
    };

    return (
        <WindowScroller
            scrollElement={document.getElementById(PAGE_ID) as Element}
        >
            {({
                height,
                width,
                registerChild,
                isScrolling,
                onChildScroll,
                scrollTop,
            }) => (
                <div
                    className={classNames(cls.ArticleList, {}, [className, cls[view]])}
                    // @ts-ignore
                    ref={registerChild}
                >
                    {virtualized ? (
                        <List
                            height={height ?? 700}
                            width={width ? width - 80 : 700}
                            rowCount={rowCount}
                            rowHeight={isLarge ? 700 : 330}
                            rowRenderer={rowRender}
                            autoHeight
                            onScroll={onChildScroll}
                            isScrolling={isScrolling}
                            scrollTop={scrollTop}
                        />
                    ) : (articles.map((item) => (
                        <ArticleListItem
                            article={item}
                            view={view}
                            className={cls.card}
                            target={target}
                            key={item.id}
                        />
                    )))}

                    {isLoading && getSkeletons(view)}
                </div>
            )}
        </WindowScroller>
    );
});
