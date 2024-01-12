import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import { ArticleList } from '@/entities/Article/ui/ArticleList/ArticleList';
import { VStack } from '@/shared/ui/Stack/VStack/VStack';
import { useArticlesRecommendationList } from '../../api/articleRecommendationApi';

interface ArticleRecommendationsListProps {
    className?: string;
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const { isLoading, data: articles, error } = useArticlesRecommendationList(3);

    if (isLoading || error || !articles) {
        return null;
    }

    return (
        <VStack gap="8" className={classNames('', {}, [className])}>
            <Text
                title="Recommendations"
                size={TextSize.L}
            />
            <ArticleList
                articles={articles}
                target="_blank"
                virtualized={false}
            />
        </VStack>
    );
});
