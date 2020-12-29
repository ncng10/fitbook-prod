import { Avatar, Box, Button, Flex, IconButton } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';
import { useFriendsListQuery, useLogoutMutation, useMyFriendsQuery, useUserProfileQuery } from '../../generated/graphql';
import { useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';
import { RiSettings2Line } from 'react-icons/ri';
interface UserProfileCardProps {

}
//used for the profile of the currently logged in user
const UserProfileCard: React.FC<UserProfileCardProps> = ({ }) => {
    const { data } = useUserProfileQuery();
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
                        <Flex alignItems="center" justifyContent="center" flexDir="row">
                            <h3 style={{ fontSize: 25, fontWeight: 700 }}>{data?.userProfile.username}</h3>
                            <NextLink href="/settings">
                                <IconButton fontSize={25} mt=".35rem" bgColor="#FFFFFF" aria-label="user-settings-button" icon={<RiSettings2Line />} />
                            </NextLink>
                        </Flex>
                        <Box>
                            <NextLink href="/friends/all">
                                <Box>{uniqueUser?.length} {uniqueUser?.length === 1 ? "Friend" : "Friends"}</Box>
                            </NextLink>
                        </Box>
                    </Box>
                </Flex>
            </Box>
        </React.Fragment>
    );
}
export default UserProfileCard