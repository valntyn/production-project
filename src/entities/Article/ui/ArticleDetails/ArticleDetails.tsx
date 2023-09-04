import { classNames } from 'shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModule/DynamicModuleLoader';
import { articleDetailsReducer } from 'entities/Article/model/slice/articleDetailsSlice';
import { memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchArticleById,
} from 'entities/Article/model/services/fetchArticleByid/fetchArticleById';
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from 'entities/Article/model/selectors/articleDetails';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Photo } from 'shared/ui/Photo/Photo';
import EyeIcon from 'shared/assets/icons/eye.svg';
import CalendarIcon from 'shared/assets/icons/calendar.svg';
import { Icon } from 'shared/ui/Icon/Icon';
import { ArticleBlock, ArticleBlockType } from 'entities/Article/model/types/article';
import {
    ArticleCodeBlockComponent,
} from 'entities/Article/ui/ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import {
    ArticleImagesBlockComponent,
} from 'entities/Article/ui/ArticleImagesBlockComponent/ArticleImagesBlockComponent';
import {
    ArticleTextBlockComponent,
} from 'entities/Article/ui/ArticleTextBlockComponent/ArticleTextBlockComponent';

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
    const dispatch = useDispatch();
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const error = useSelector(getArticleDetailsError);
    const article = useSelector(getArticleDetailsData);

    const renderBlock = useCallback((block: ArticleBlock) => {
        switch (block.type) {
        case ArticleBlockType.CODE:
            return (
                <ArticleCodeBlockComponent
                    key={block.id}
                    block={block}
                />
            );
        case ArticleBlockType.IMAGE:
            return (
                <ArticleImagesBlockComponent
                    key={block.id}
                    block={block}
                />
            );
        case ArticleBlockType.TEXT:
            return (
                <ArticleTextBlockComponent
                    key={block.id}
                    block={block}
                />
            );
        default: return null;
        }
    }, []);

    useEffect(() => {
        if (id) {
            dispatch(fetchArticleById(id));
        }
    }, [dispatch, id]);

    let content;

    if (isLoading) {
        content = (
            <>
                <Skeleton className={cls.photo} width={200} height={200} border="50%" />
                <Skeleton className={cls.skeleton} width={300} height={32} />
                <Skeleton className={cls.skeleton} width={400} height={24} />
                <Skeleton className={cls.skeleton} width="100%" height={200} />
                <Skeleton className={cls.skeleton} width="100%" height={200} />
            </>
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
            <>
                <div className={cls.photoWrapper}>
                    <Photo size={200} src={article?.img} className={cls.photo} />
                </div>
                <Text
                    title={article?.title}
                    className={cls.skeleton}
                    text={article?.subtitle}
                    size={TextSize.M}
                />
                <div className={cls.articleInfo}>
                    <Icon Svg={EyeIcon} className={cls.icon} />
                    <Text text={String(article?.views)} />
                </div>
                <div className={cls.articleInfo}>
                    <Icon Svg={CalendarIcon} className={cls.icon} />
                    <Text text={article?.createdAt} />
                </div>
                {article?.blocks.map(renderBlock)}
            </>
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
