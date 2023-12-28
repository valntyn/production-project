import { memo } from 'react';

import { VStack } from 'shared/ui/Stack/VStack/VStack';
import { Page } from 'widgets/Page/Page';
import { EditableProfileCard } from 'features/editableProfileCard';
import { useParams } from 'react-router-dom';
import { Text, TextSize } from 'shared/ui/Text/Text';
import {
    EditableProfileCardHeader,
} from 'features/editableProfileCard/ui/EditableProfileCardHeader/EditableProfileCardHeader';

interface Props {
    className?: string;
}

const ProfilePage = memo(({ className }: Props) => {
    const { id } = useParams<{ id: string }>();

    if (!id) {
        return <Text title="Не знайдено" size={TextSize.M} />;
    }

    return (
        <Page>
            <VStack>
                <EditableProfileCardHeader />
                <EditableProfileCard id={id} />
            </VStack>
        </Page>
    );
});

export default ProfilePage;
