import { ChevronLeftIcon } from '@chakra-ui/icons';
import { Avatar, Box, Button, Flex } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import { useAddFriendMutation, useMyFriendsQuery } from '../../generated/graphql';
interface UserProfileCardProps {
    profilePicture: string | undefined;
    username: string | undefined;
    id: number;
}
//profile card for every user except for the currently logged in user
const UserProfileCard: React.FC<UserProfileCardProps> = ({ profilePicture, username, id }) => {
    const [addFriend] = useAddFriendMutation();
    const { data: friendCodeData, loading } = useMyFriendsQuery({
        skip: id === -1,
        variables: {
            input: id
        }
    });
    let body;

    //loops through array given back from the graphql query. it returns two items(for older accounts due to testing), one for the logged in user's relationship and the othe user's
    const status = friendCodeData?.myFriends.map(friend => friend.friendshipStatus)
    //if they have not added each other or are not friends, undefined will be returned at the index of 0 of the array. 
    if (loading) {
        <Box>loading...</Box>
    }
    else if (status?.[0] === undefined) {
        body =
            <Box>
                <Button
                    onClick={async () => {
                        addFriend({
                            variables: {
                                input: {
                                    friendshipStatus: 0,
                                    userTwoIdentity: id
                                }
                            },
                            update: (cache) => {
                                cache.evict({ fieldName: "myFriends" })
                            }
                        })
                    }}
                    bgColor="#3C3D66" color="#DADDE9" w={140} h="40px" borderRadius={25}>
                    Add as Friend
                    </Button>
            </Box>
        //if one of them have a status of 1, it means they are friends. mutation of adding a friend only updates it for one user.
    } else if (status?.[0] === 1 || status?.[1] === 1) {
        body = <Button bgColor="#3C3D66" color="#DADDE9" w={140} h="40px" borderRadius={25}>Friends</Button>

        //in order for a pending friend request to happen, both of the friendship codes must be 1.
    } else if (status?.[0] === 0) {
        body =
            <Button bgColor="#3C3D66" color="#DADDE9" w={140} h="40px" borderRadius={25}>Pending...</Button>
    }

    return (
        <React.Fragment>
            <NextLink href="/search">
                <Flex fontSize={50}><ChevronLeftIcon /></Flex>
            </NextLink>
            <Box>
                <Flex mt={5} alignItems="center" flexDir="column">
                    <Avatar size="xl" src={`https://storage.googleapis.com/fitbook-production/${profilePicture}`} />
                    <Box>
                        <h3 style={{ fontSize: 36, marginTop: 15, color: "#3C3D66" }}>{username}</h3>
                    </Box>
                </Flex>
                <Flex mt={5} width="100%" flexDir="row" alignItems="center" justifyContent="space-evenly">
                    {body}
                    <Button bgColor="#FFFFFF" color="#3C3D66" border="1px solid #3C3D66" w={140} h="40px" borderRadius={25}>Message</Button>
                </Flex>
            </Box>
        </React.Fragment>
    );
}
export default UserProfileCard