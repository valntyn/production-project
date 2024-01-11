import { memo, useState } from 'react';
import cls from './StarRating.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon } from '@/shared/ui/Icon/Icon';
import StarIcon from '../../assets/icons/star.svg';
import { HStack } from '@/shared/ui/Stack/HStack/HStack';

interface StarRatingProps {
    className?: string;
    onSelect?: (starsCount: number) => void;
    size?: number;
    selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = memo((props: StarRatingProps) => {
    const {
        className, onSelect, size = 30, selectedStars = 0,
    } = props;
    const [currentStarsCount, setCurrentStarsCurrent] = useState(selectedStars);
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

    const onHover = (starsCount: number) => () => {
        if (!isSelected) {
            setCurrentStarsCurrent(starsCount);
        }
    };

    const onClick = (starsCount: number) => () => {
        if (!isSelected) {
            onSelect?.(starsCount);
            setCurrentStarsCurrent(starsCount);
            setIsSelected(true);
        }
    };

    const onLeave = () => {
        if (!isSelected) {
            setCurrentStarsCurrent(0);
        }
    };

    return (
        <HStack
            gap="4"
            align="center"
            justify="center"
            className={classNames(cls.StarRating, {}, [className])}
        >
            {stars.map((starNumber) => (
                <Icon
                    className={
                        classNames(
                            cls.star,
                            {
                                [cls.hovered]: currentStarsCount >= starNumber,
                                [cls.selected]: isSelected,
                            },
                            [className],
                        )
                    }
                    Svg={StarIcon}
                    key={starNumber}
                    onMouseLeave={onLeave}
                    onMouseEnter={onHover(starNumber)}
                    onClick={onClick(starNumber)}
                />
            ))}
        </HStack>
    );
});
