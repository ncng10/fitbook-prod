import { Avatar, Box, Button, Flex } from '@chakra-ui/react';
import React from 'react'
import { useAcceptFriendRequestMutation, usePendingFriendsQuery } from '../../generated/graphql';

interface FriendRequestsProps {

}

const FriendRequests: React.FC<FriendRequestsProps> = ({ }) => {
    const [acceptFriendRequest] = useAcceptFriendRequestMutation();
    const { data } = usePendingFriendsQuery({
        fetchPolicy: "network-only"
    });
    let body;
    if (data?.pendingFriends.length === 0) {
        body = "No friend requests."
    } else {
        body =
            <Box mt={15}>
                Friend Requests:
                {data?.pendingFriends.map((friendRequest) => (
                <Box key={friendRequest.id}>
                    <Flex flexDir="column" alignItems="center">
                        <Flex alignItems="center" justifyContent="center">
                            <Avatar src={`https://storage.googleapis.com/fitbook-production/${friendRequest.profilePicture}`} />
                            <Box ml={5}>{friendRequest?.username} wants to add you.</Box>
                        </Flex >
                        <Box>
                            <Button
                                onClick={async () => {
                                    await acceptFriendRequest({
                                        variables: {
                                            userOneIdentity: friendRequest.id
                                        },
                                        update: (cache) => {
                                            cache.evict({ fieldName: "pendingFriends" })
                                        }
                                    })
                                }}
                            >Accept</Button>
                        </Box>
                    </Flex>
                </Box>
            ))}
            </Box>
    }
    return (
        <React.Fragment>
            {body}
        </React.Fragment>
    );
}
export default FriendRequests