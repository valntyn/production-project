import { classNames } from 'shared/lib/classNames/classNames';
import {
    DynamicModuleLoader, ReducersList,
} from 'shared/lib/components/DynamicModule/DynamicModuleLoader';
import { articleDetailsReducer } from 'entities/Article/model/slice/articleDetailsSlice';
import { useTranslation } from 'react-i18next';
import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchArticleById,
} from 'entities/Article/model/services/fetchArticleByid/fetchArticleById';
import {
    getArticleDetailsData, getArticleDetailsError, getArticleDetailsIsLoading,
} from 'entities/Article/model/selectors/articleDetails';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';

import cls from './ArticleDetails.module.scss';

const reducers: ReducersList = {
    articleDetais: articleDetailsReducer,
};

interface ArticleDetailsProps {
    className?: string;
    id: string;
}

export const ArticleDetails = memo(({
    className,
    id,
}: ArticleDetailsProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const article = useSelector(getArticleDetailsData);
    const error = useSelector(getArticleDetailsError);

    useEffect(() => {
        if (id) {
            dispatch(fetchArticleById(id));
        }
    }, [dispatch, id]);

    let content;

    if (isLoading) {
        content = (
            <div>Loading...</div>
        );
    } else if (error) {
        content = (
            <Text
                align={TextAlign.CENTER}
                text="Error: something went wrong"
                theme={TextTheme.ERROR}
            />
        );
    } else {
        content = (
            <div>ARTICLE DETAILS</div>
        );
    }

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterMount
        >
            <div
                className={classNames(cls.ArticleDetails, {}, [className])}
            >
                {content}
            </div>
        </DynamicModuleLoader>
    );
});
