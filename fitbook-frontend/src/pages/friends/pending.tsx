import { Box, Button } from '@chakra-ui/react';
import React from 'react'
import { NavBar } from '../../components/NavBar';
import { useAcceptFriendRequestMutation, useNewFriendRequestSubscription, usePendingFriendsQuery } from '../../generated/graphql';
import { withApollo } from '../../utils/withApollo';

interface PendingProps {

}

const Pending: React.FC<PendingProps> = ({ }) => {
    const [acceptFriendRequest] = useAcceptFriendRequestMutation();
    const { data } = usePendingFriendsQuery({
        fetchPolicy: "network-only"
    });
    return (
        <React.Fragment>
            <NavBar />
            <Box mt={15}>
                Friend Requests:
                {data?.pendingFriends.map((friendRequest) => (
                <Box key={friendRequest.id}>
                    <Box>{friendRequest.username}</Box>
                    <Box>
                        <Button
                            onClick={async () => {
                                await acceptFriendRequest({
                                    variables: {
                                        userTwoIdentity: friendRequest.id
                                    },
                                    update: (cache) => {
                                        cache.evict({ fieldName: "pendingFriends" })
                                    }
                                })
                            }}
                        >Accept</Button>
                    </Box>
                </Box>
            ))}
            </Box>
        </React.Fragment>
    );
}
export default withApollo({ ssr: false })(Pending)