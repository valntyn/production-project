import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { ArticleList } from 'entities/Article/ui/ArticleList/ArticleList';
import { VStack } from 'shared/ui/Stack/VStack/VStack';
import { rtkApi } from 'shared/api/rtkApi';

interface ArticleRecommendationsListProps {
    className?: string;
}

const recommendationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticlesRecommendationList: build.query({
            query: (limit) => ({
                url: '/articles',
                params: {
                    _limit: limit,
                },
            }),
        }),
    }),
});

const useArticlesRecommendationList = recommendationsApi.useGetArticlesRecommendationListQuery;

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const { isLoading, data } = useArticlesRecommendationList(3);

    return (
        <VStack gap="8" className={classNames('', {}, [className])}>
            <Text
                title="Recommendations"
                size={TextSize.L}
            />
            <ArticleList
                articles={[]}
                target="_blank"
            />
        </VStack>
    );
});
