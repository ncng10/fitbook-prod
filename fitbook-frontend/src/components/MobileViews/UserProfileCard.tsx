import { Avatar, Box, Flex } from '@chakra-ui/react';
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
                <Flex mt={5} ml={5} alignItems="center">
                    <Avatar size="xl" src={`https://storage.googleapis.com/fitbook-production/${data?.userProfile?.profilePicture}`} />
                    <Box ml={5}>
                        <h3 style={{ fontSize: 25, fontWeight: 700 }}>{data?.userProfile.username}</h3>
                    </Box>
                </Flex>
                {/* <Box onClick={async () => {
                    await logout();
                    apolloClient.resetStore();
                    router.push("/")
                }}>Logout</Box> */}
            </Box>
        </React.Fragment>
    );
}
export default UserProfileCard