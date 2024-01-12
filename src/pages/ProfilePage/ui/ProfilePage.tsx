import { memo } from 'react';

import { useParams } from 'react-router-dom';
import { VStack } from '@/shared/ui/Stack/VStack/VStack';
import { Page } from '@/widgets/Page/Page';
import { EditableProfileCard, EditableProfileCardHeader } from '@/features/editableProfileCard';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import { ProfileRating } from '@/features/profileRating';

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
                <ProfileRating profileId={id} />
            </VStack>
        </Page>
    );
});

export default ProfilePage;
