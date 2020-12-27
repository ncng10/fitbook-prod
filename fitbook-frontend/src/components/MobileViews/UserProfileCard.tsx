import { Avatar, Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react'
import { useLogoutMutation, useUserProfileQuery } from '../../generated/graphql';
import { useApolloClient } from '@apollo/client';
interface UserProfileCardProps {

}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ }) => {
    const { data } = useUserProfileQuery();
    const router = useRouter();
    const [logout] = useLogoutMutation();
    const apolloClient = useApolloClient();
    return (
        <React.Fragment>
            <Box>
                <Box>
                    <Avatar src={`https://storage.googleapis.com/fitbook-production/${data?.userProfile?.profilePicture}`} />
                </Box>
                <Box onClick={async () => {
                    await logout();
                    apolloClient.resetStore();
                    router.push("/")
                }}>Logout</Box>
            </Box>
        </React.Fragment>
    );
}
export default UserProfileCard