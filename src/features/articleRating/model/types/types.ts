export interface GetArticleRating {
    rate: number;
    feedback?: string;
}

export interface GetArticleParams {
    userId: string;
    articleId: string;
}

export interface PostArticleRating {
    userId: string;
    articleId: string;
    rate: number;
    feedback?: string;
}
