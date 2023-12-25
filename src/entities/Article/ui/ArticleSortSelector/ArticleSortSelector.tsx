import { memo, useMemo } from 'react';
import { Select, SelectOption } from 'shared/ui/Select/Select';
import { ArticleSortField } from 'entities/Article/model/types/article';
import { SortOrder } from 'shared/types';

import { HStack } from 'shared/ui/Stack/HStack/HStack';
import cls from './ArticleSortSelector.module.scss';

interface ArticleSortSelectorProps {
    className?: string;
    sort: ArticleSortField,
    order: SortOrder,
    onChangeOrder: (newOrder: SortOrder) => void,
    onChangeSort: (newSort: ArticleSortField) => void,
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
    const {
        className, onChangeSort, onChangeOrder, order, sort,
    } = props;

    const orderOptions = useMemo<SelectOption<SortOrder>[]>(() => [
        {
            value: 'asc',
            content: 'зростанням',
        },
        {
            value: 'desc',
            content: 'зменшенням',
        },
    ], []);

    const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(() => [
        {
            value: ArticleSortField.CREATED,
            content: 'датою створення',
        },
        {
            value: ArticleSortField.VIEW,
            content: 'переглядами',
        },
        {
            value: ArticleSortField.TITILE,
            content: 'назвою',
        },
    ], []);

    return (
        <HStack gap="10">
            <Select
                options={sortFieldOptions}
                value={sort}
                onChange={onChangeSort}
                label="Сортировка за"
            />
            <Select
                options={orderOptions}
                value={order}
                onChange={onChangeOrder}
                label="за"
                className={cls.order}
            />
        </HStack>
    );
});
