import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, IconButton, Input, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { RiUser2Fill } from 'react-icons/ri';
import { usePendingFriendsQuery } from '../generated/graphql';

interface PendingFriendsProps {

}

const PendingFriends: React.FC<PendingFriendsProps> = ({ }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();
    const { data } = usePendingFriendsQuery();
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
                                <Box>
                                    <Box>{friendRequest.username}</Box>
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