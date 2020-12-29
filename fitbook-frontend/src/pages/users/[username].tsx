import { Box } from '@chakra-ui/react';
import React from 'react'
import BottomNavigation from '../../components/MobileViews/BottomNavigation';
import PublicUserProfileCard from '../../components/MobileViews/PublicUserProfileCard';
import { usePublicUserProfileQuery } from '../../generated/graphql';
import { useGetUsernameUrl } from '../../utils/useGetUsernameUrl';
import { withApollo } from '../../utils/withApollo';

interface PublicUserProfileProps {

}

const PublicUserProfile: React.FC<PublicUserProfileProps> = ({ }) => {

    const userName = useGetUsernameUrl();

    const { data } = usePublicUserProfileQuery({
        variables: {
            input: userName
        }
    });
    console.log("username", userName)
    return (
        <React.Fragment>
            <Box>
                <PublicUserProfileCard
                    profilePicture={data?.publicUserProfile.profilePicture}
                    username={data?.publicUserProfile.username}
                    id={data?.publicUserProfile.id}
                />
            </Box>
            <BottomNavigation />
        </React.Fragment>
    );
}
export default withApollo({ ssr: true })(PublicUserProfile)