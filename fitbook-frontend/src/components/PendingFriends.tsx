import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, IconButton, Input, useDisclosure, useToast } from '@chakra-ui/react';
import React from 'react';
import { RiUser2Fill } from 'react-icons/ri';
import { useAcceptFriendRequestMutation, useNewFriendRequestSubscription, usePendingFriendsQuery } from '../generated/graphql';

interface PendingFriendsProps {
}

const PendingFriends: React.FC<PendingFriendsProps> = ({ }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [acceptFriendRequest] = useAcceptFriendRequestMutation();
    const btnRef = React.useRef();
    const { data, refetch } = usePendingFriendsQuery();
    const { data: friendRequestSubsciptionData } = useNewFriendRequestSubscription();
    return (
        <React.Fragment>
            <IconButton
                aria-label="pending-friend-requests-button"
                icon={<RiUser2Fill />}
                ref={btnRef} borderRadius={50} onClick={onOpen} />
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay>
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>Pending Friend Requests</DrawerHeader>

                        <DrawerBody>
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
                        </DrawerBody>

                        <DrawerFooter>

                        </DrawerFooter>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </React.Fragment>
    );
}
export default PendingFriends