import { Avatar, Box, Flex, IconButton } from '@chakra-ui/react';
import React from 'react';
import { RiFileAddLine } from 'react-icons/ri';
import { useMyFriendsQuery } from '../../generated/graphql';
interface UserProfileCardProps {
    profilePicture: string;
    username: string;
    id: number;
}
//profile card for every user except for the currently logged in user
const UserProfileCard: React.FC<UserProfileCardProps> = ({ profilePicture, username, id }) => {
    const { data: friendCodeData } = useMyFriendsQuery({
        variables: {
            input: id
        }
    });
    let body;
    const status = friendCodeData?.myFriends.map(friend => friend.friendshipStatus)
    if (status?.[0] === undefined) {
        body =
            <Box>
                <Box>Not Friends</Box>
                <IconButton aria-label="add-friend-button" icon={<RiFileAddLine />} />
            </Box>

    } else if (status?.[0] === 1 || status?.[1] === 1) {
        body = <Box>Friends</Box>
    };

    console.log(status?.[0])
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