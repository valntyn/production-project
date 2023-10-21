import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import ListIcon from 'shared/assets/icons/bi-list.svg';
import TilesIcon from 'shared/assets/icons/fe-list.svg';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';

import { ArticleView } from '../../model/types/article';
import cls from './viewSelector.module.scss';

interface viewSelectorProps {
    className?: string;
    view?: ArticleView;
    onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
    {
        view: ArticleView.SMALL,
        icon: TilesIcon,
    },
    {
        view: ArticleView.LARGE,
        icon: ListIcon,
    },
];

export const ViewSelector = memo((props: viewSelectorProps) => {
    const { className, onViewClick, view } = props;

    const onClick = (newView: ArticleView) => () => {
        onViewClick?.(newView);
    };

    return (
        <div className={classNames(cls.viewSelector, {}, [className])}>
            {viewTypes.map((viewType, i) => (
                <Button
                    key={i}
                    theme={ThemeButton.CLEAR}
                    onClick={onClick(viewType?.view)}
                >
                    <Icon
                        Svg={viewType?.icon}
                        className={classNames(
                            cls.selected,
                            { [cls.notSelected]: viewType.view !== view },
                        )}
                    />
                </Button>
            ))}
        </div>
    );
});
