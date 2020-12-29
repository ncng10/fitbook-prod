import { Avatar, Box, Flex, IconButton } from '@chakra-ui/react';
import React from 'react';
import { RiFileAddLine, RiUserAddFill } from 'react-icons/ri';
import { useAddFriendMutation, useMyFriendsQuery } from '../../generated/graphql';
interface UserProfileCardProps {
    profilePicture: string;
    username: string;
    id: number;
}
//profile card for every user except for the currently logged in user
const UserProfileCard: React.FC<UserProfileCardProps> = ({ profilePicture, username, id }) => {
    const [addFriend] = useAddFriendMutation();
    const { data: friendCodeData } = useMyFriendsQuery({
        variables: {
            input: id
        }
    });
    let body;

    //loops through array given back from the graphql query. it returns two items(for older accounts due to testing), one for the logged in user's relationship and the othe user's
    const status = friendCodeData?.myFriends.map(friend => friend.friendshipStatus)
    //if they have not added each other or are not friends, undefined will be returned at the index of 0 of the array. 
    if (status?.[0] === undefined) {
        body =
            <Box>
                <Box>Not Friends</Box>
                <IconButton
                    fontSize={25}
                    w={50}
                    h={50}
                    mr={5}
                    icon={<RiUserAddFill />}
                    aria-label="add-friend-button"
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
                />
            </Box>

        //if one of them have a status of 1, it means they are friends. mutation of adding a friend only updates it for one user.
    } else if (status?.[0] === 1 || status?.[1] === 1) {
        body = <Box>Friends</Box>

        //in order for a pending friend request to happen, both of the friendship codes must be 1.
    } else if (status?.[0] === 0) {
        body =
            <Box>Pending friend request...</Box>
    }

    return (
        <React.Fragment>
            <Box>
                <Flex mt={5} ml={5} alignItems="center">
                    <Avatar size="xl" src={`https://storage.googleapis.com/fitbook-production/${profilePicture}`} />
                    <Box ml={5}>
                        <h3 style={{ fontSize: 25, fontWeight: 700 }}>{username}</h3>
                    </Box>
                </Flex>
                {body}
            </Box>
        </React.Fragment>
    );
}
export default UserProfileCard