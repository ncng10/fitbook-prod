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
            <Box mt={-20} width="100%">
                <Flex alignItems="center" flexDir="column">
                    <Avatar size="xl" src={`https://storage.googleapis.com/fitbook-production/${data?.userProfile?.profilePicture}`} />
                    <Box>
                        <h3 style={{ fontSize: 36, marginTop: 15, color: "#3C3D66" }}>{data?.userProfile.username}</h3>
                    </Box>
                    <Flex mt={5} width="100%" flexDir="row" alignItems="center" justifyContent="space-evenly">
                        <Button bgColor="#3C3D66" color="#DADDE9" w={140} h="40px" borderRadius={25}>{uniqueUser?.length} {uniqueUser?.length === 1 ? "Friend" : "Friends"}</Button>
                        <Button bgColor="#FFFFFF" color="#3C3D66" border="1px solid #3C3D66" w={140} h="40px" borderRadius={25}>Messages</Button>
                    </Flex>
                </Flex>
            </Box>
        </React.Fragment>
    );
}
export default UserProfileCard