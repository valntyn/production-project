import { BugButton } from 'app/providers/ErrorBoundary';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page/Page';
import { HStack } from 'shared/ui/Stack/HStack/HStack';
import { ListBox } from 'shared/ui/ListBox/ListBox';

const MainPage = memo(() => {
    const { t } = useTranslation('main');

    return (
        <Page>
            <BugButton />
            {t('Головна')}
            <HStack>
                <div>123</div>
                <ListBox
                    defaultValue="Choose value"
                    onChange={(value: string) => {
                    }}
                    value={undefined}
                    items={[
                        { value: '1', content: '123' },
                        { value: '2', content: 'sdf', disabled: true },
                        { value: '3', content: '123sdfds' },
                    ]}
                />
            </HStack>
        </Page>
    );
});

export default MainPage;
