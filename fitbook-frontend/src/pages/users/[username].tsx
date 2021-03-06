import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import SharedByUserCarousel from '../../components/fitness/SharedByUserCarousel';
import SharedProgramsCarousel from '../../components/fitness/SharedProgramsCarousel';
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
            <Box>
                <Box mt={75} cursor="pointer" display="flex" fontSize={25} backgroundColor="#FFFFFF" aria-label="shared-programs" >
                    <Box ml={5} fontSize={16} fontWeight={800} fontStyle="bold">Shared With You</Box>
                </Box>
                <SharedByUserCarousel sharedById={data?.publicUserProfile.id} />
            </Box>
            <BottomNavigation />
        </React.Fragment>
    );
}
export default withApollo({ ssr: true })(PublicUserProfile)