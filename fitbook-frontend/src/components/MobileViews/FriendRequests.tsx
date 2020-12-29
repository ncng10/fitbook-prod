import { Avatar, Box, Flex, IconButton } from '@chakra-ui/react';
import React from 'react';
import { RiCheckLine, RiCloseLine } from 'react-icons/ri';
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
        body =
            <Flex mt={25} alignItems="center" justifyContent="center">
                No friend requests...
        </Flex>
    } else {
        body =
            <Box >
                <Flex mt={25} alignItems="center" justifyContent="center">
                    Friend Requests:
                </Flex>
                {data?.pendingFriends.map((friendRequest) => (
                    <Box mt={5} key={friendRequest.id} >
                        <Flex flexDir="column" alignItems="center">
                            <Flex alignItems="center" justifyContent="center">
                                <Avatar src={`https://storage.googleapis.com/fitbook-production/${friendRequest.profilePicture}`} />
                                <Box ml={3}>{friendRequest?.username} wants to add you.</Box>
                                <Box display="flex" flexDir="row" >
                                    <IconButton aria-label="accept-friend-request"
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
                                        fontSize={20}
                                        ml={3}
                                        icon={<RiCheckLine />}
                                    />
                                    <IconButton aria-label="decline-friend-request" ml={3} fontSize={20} icon={<RiCloseLine />} />
                                </Box>
                            </Flex >
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