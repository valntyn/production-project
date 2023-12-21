import { combineReducers } from '@reduxjs/toolkit';

import { articleDetailsPageRecommendationReducer } from './articleDetailsPageRecommendationSlice';
import { articleDetailsCommentsReducer } from './articleDetailsCommentSlice';
import { ArticleDetailsPageSchema } from '../types';

export const articleDetailsPageReducer = combineReducers<ArticleDetailsPageSchema>({
    recommendations: articleDetailsPageRecommendationReducer,
    comments: articleDetailsCommentsReducer,
});
