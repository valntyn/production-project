import { memo, useCallback } from 'react';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { classNames } from 'shared/lib/classNames/classNames';
import { Icon } from 'shared/ui/Icon/Icon';
import CopyIcon from 'shared/assets/icons/copy.svg';

import cls from './Code.module.scss';

interface CodeProps {
    className?: string;
    text: string;
}

export const Code = memo((props: CodeProps) => {
    const { className, text } = props;

    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text);
    }, [text]);

    return (
        <pre className={classNames(
            cls.Code,
            {},
            [className],
        )}
        >
            <Button
                onClick={onCopy}
                className={cls.button}
                theme={ThemeButton.CLEAR}
            >
                <Icon Svg={CopyIcon} />
            </Button>
            <code>
                {text}
            </code>
        </pre>
    );
});
