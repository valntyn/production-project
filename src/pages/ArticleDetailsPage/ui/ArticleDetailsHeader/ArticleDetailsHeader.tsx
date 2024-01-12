import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { getArticleDetailsData } from '@/entities/Article/model/selectors/articleDetails';
import { getCanEditArticle } from '../../model/selectors/article';

import cls from './ArticleDetailsHeader.module.scss';

interface ArticleDetailsHeaderProps {
    className?: string;
}

export const ArticleDetailsHeader = memo((props: ArticleDetailsHeaderProps) => {
    const { className } = props;
    const article = useSelector(getArticleDetailsData);
    const canEdit = useSelector(getCanEditArticle);
    const navigate = useNavigate();

    const onBackToList = useCallback(() => {
        navigate(RoutePath.articles);
    }, [navigate]);

    const onEditArticle = useCallback(() => {
        navigate(`${RoutePath.articles}/${article?.id}/edit`);
    }, [article?.id, navigate]);

    return (
        <div className={classNames(cls.ArticleDetailsHeader, {}, [className])}>
            <Button
                theme={ThemeButton.OUTLINE}
                onClick={onBackToList}
            >
                Повернутися
            </Button>
            {canEdit && (
                <Button
                    className={cls.editBtn}
                    theme={ThemeButton.OUTLINE}
                    onClick={onEditArticle}
                >
                    Редагувати
                </Button>
            )}
        </div>
    );
});
