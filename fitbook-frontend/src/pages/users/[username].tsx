import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import BottomNavigation from '../../components/MobileViews/BottomNavigation';
import PublicUserProfileCard from '../../components/MobileViews/PublicUserProfileCard';
import { useMeQuery, usePublicUserProfileQuery } from '../../generated/graphql';
import { useGetUsernameUrl } from '../../utils/useGetUsernameUrl';
import { withApollo } from '../../utils/withApollo';

interface PublicUserProfileProps {

}

const PublicUserProfile: React.FC<PublicUserProfileProps> = ({ }) => {
    const router = useRouter();
    const userName = useGetUsernameUrl();
    const { data: meData } = useMeQuery();
    const { data } = usePublicUserProfileQuery({
        variables: {
            input: userName
        }
    });
    useEffect(() => {
        if (userName === meData?.me.username) {
            router.push("/profile")
        }
    })
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