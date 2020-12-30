import { Avatar, Box, Flex, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { RiCheckLine, RiShareLine } from 'react-icons/ri';
import { useFriendsListQuery, useProgramQuery, useShareProgramMutation } from '../../generated/graphql';
import { useGetIntId } from '../../utils/useGetIntId';

interface ShareProgramModalProps {
    intId: number;
}

const ShareProgramModal: React.FC<ShareProgramModalProps> = ({ }) => {
    const intId = useGetIntId();
    const { data: shareToFriendsData } = useFriendsListQuery();
    const [shareProgram] = useShareProgramMutation();
    const unique = (value, index, self) => {
        return self.indexOf(value) === index
    };
    const uniqueUser = shareToFriendsData?.friendsList.filter(unique);
    const { data: sharedWithData } = useProgramQuery({
        skip: intId === -1,
        variables: {
            input: intId
        }
    });
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <React.Fragment>
            <IconButton onClick={onOpen} aria-label="share-program-button" icon={<RiShareLine />} />
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent h="auto">
                    <ModalCloseButton />
                    <ModalHeader display="flex" alignItems="center" justifyContent="center">Share This Program</ModalHeader>
                    <ModalBody display="flex" justifyContent="center">
                        <Box display="flex" flexDir="column">
                            <Formik
                                initialValues={{ programId: intId, sharedToId: "0" }}
                                onSubmit={async (values) => {
                                    await shareProgram({
                                        variables: {
                                            input: {
                                                programId: intId,
                                                sharedToId: parseInt(values.sharedToId)
                                            }
                                        },
                                        update: (cache) => {
                                            cache.evict({ fieldName: "program" })
                                        }
                                    })
                                }}
                            >
                                <Form>
                                    <Field as="select" name="sharedToId">
                                        <option defaultValue="true">Friends</option>
                                        {uniqueUser?.map((friend) => {
                                            return (
                                                <option key={friend.id} value={friend.id}>{friend.username}</option>
                                            )
                                        })}
                                    </Field>
                                    <IconButton aria-label="share-program-confirmation" type="submit" icon={<RiCheckLine />} />
                                </Form>
                            </Formik>
                            <Box>
                                Shared With:
                                <Box>
                                    {sharedWithData?.program.sharedWith.map((sharedWithUser) => (
                                        <Flex mb={2} flexDir="row" key={sharedWithUser.id}>
                                            <Avatar mr={3} src={`https://storage.googleapis.com/fitbook-production/${sharedWithUser?.profilePicture}`} />
                                            <Box>{sharedWithUser.username}</Box>
                                        </Flex>
                                    ))}
                                </Box>
                            </Box>
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </React.Fragment>
    );
}
export default ShareProgramModal