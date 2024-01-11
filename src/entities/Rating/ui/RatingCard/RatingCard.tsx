import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './RatingCard.module.scss';
import { Card } from '@/shared/ui/Card/Card';
import { VStack } from '@/shared/ui/Stack/VStack/VStack';
import { Text } from '@/shared/ui/Text/Text';
import { StarRating } from '@/shared/ui/StarRating/StarRating';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Input } from '@/shared/ui/Input/Input';
import { Drawer } from '@/shared/ui/Drawer/Drawer';
import { HStack } from '@/shared/ui/Stack/HStack/HStack';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';

interface RatingCardProps {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    hasFeedback: boolean;
    onCancel?: (starsCount: number) => void;
    onAccept?: (starsCount: number, feedback?: string) => void;
    rate?: number;
}

export const RatingCard = memo((props: RatingCardProps) => {
    const {
        className,
        onCancel,
        hasFeedback,
        feedbackTitle,
        title,
        rate = 0,
        onAccept,
    } = props;
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(rate);
    const [feedback, setFeedback] = useState('');

    const onSelectStars = useCallback((selectedStarsCount: number) => {
        setStarsCount(selectedStarsCount);

        if (hasFeedback) {
            setIsModalOpen(true);
        } else {
            onAccept?.(starsCount);
        }
    }, [hasFeedback, onAccept, starsCount]);

    const acceptHandler = useCallback(() => {
        setIsModalOpen(false);
        onAccept?.(starsCount, feedback);
    }, [feedback, onAccept, starsCount]);

    const cancelHandler = useCallback(() => {
        setIsModalOpen(false);
        onCancel?.(starsCount);
    }, [onCancel, starsCount]);

    const feedbackContent = (
        <VStack max gap="16" className={cls.modalContent}>
            <Input placeholder={t('Ваш відгук')} />
        </VStack>
    );

    return (
        <Card className={classNames(cls.Rating, {}, [className])}>
            <VStack align="center" gap="8">
                <Text title={starsCount ? t('Дякуємо за відгук') : title} />
                <StarRating selectedStars={starsCount} size={40} onSelect={onSelectStars} />

                <BrowserView>
                    <Modal isOpen={isModalOpen} title={feedbackTitle} lazy>
                        {feedbackContent}
                        <HStack max gap="16" justify="end">
                            <Button
                                theme={ThemeButton.OUTLINE_RED}
                                onClick={cancelHandler}
                            >
                                {t('Закрити')}
                            </Button>
                            <Button onClick={acceptHandler}>
                                {t('Відправити')}
                            </Button>
                        </HStack>
                    </Modal>
                </BrowserView>

                <MobileView>
                    <Drawer isOpen={isModalOpen} lazy onClose={cancelHandler}>
                        {feedbackContent}
                        <VStack gap="16">
                            <Button onClick={acceptHandler} fullWidth>
                                {t('Відправити')}
                            </Button>
                        </VStack>
                    </Drawer>
                </MobileView>

            </VStack>
        </Card>
    );
});
