import { useEffect, useState } from 'react';
import { Button } from 'shared/ui/Button/Button';

// кнопка для тесту

export const BugButton = () => {
    const [error, setError] = useState(false);

    const throwError = () => setError(true);

    useEffect(() => {
        if (error) {
            throw new Error();
        }
    }, [error]);

    return (
        <Button
            onClick={throwError}
        >
            throw error
        </Button>
    );
};
