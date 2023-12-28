import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { ArticleList } from 'entities/Article/ui/ArticleList/ArticleList';
import { VStack } from 'shared/ui/Stack/VStack/VStack';

interface ArticleRecommendationsListProps {
    className?: string;
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation();

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
