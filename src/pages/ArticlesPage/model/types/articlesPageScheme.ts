import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleView } from 'entities/Article';

export interface ArticlesPageScheme extends EntityState<Article> {
    isLoading?: boolean;
    error?: string;

    view: ArticleView;
}
