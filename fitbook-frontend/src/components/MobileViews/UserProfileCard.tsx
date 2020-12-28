import { Avatar, Box, Flex } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';
import { useFriendsListQuery, useLogoutMutation, useMyFriendsQuery, useUserProfileQuery } from '../../generated/graphql';
interface UserProfileCardProps {

}
//used for the profile of the currently logged in user
const UserProfileCard: React.FC<UserProfileCardProps> = ({ }) => {
    const { data } = useUserProfileQuery();
    const [logout] = useLogoutMutation();
    const { data: friendsListData } = useFriendsListQuery();


    //not using [...new Set(arr)]
    const unique = (value, index, self) => {
        return self.indexOf(value) === index
    };
    const uniqueUser = friendsListData?.friendsList.filter(unique);

    return (
        <React.Fragment>
            <Box>
                <Flex mt={5} ml={5} alignItems="center">
                    <Avatar size="xl" src={`https://storage.googleapis.com/fitbook-production/${data?.userProfile?.profilePicture}`} />
                    <Box ml={5}>
                        <h3 style={{ fontSize: 25, fontWeight: 700 }}>{data?.userProfile.username}</h3>
                        <Box>
                            <NextLink href="/friends/all">
                                <Box>{uniqueUser?.length} Friends</Box>
                            </NextLink>
                        </Box>
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