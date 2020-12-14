import { Box, Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { Table, TableCaption, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table"
import React from 'react'
import { AiOutlineEye } from 'react-icons/ai';

interface workoutModalProps {

}

const WorkoutModal: React.FC<workoutModalProps> = ({ }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <React.Fragment>
            <IconButton
                onClick={onOpen}
                aria-label="view-workout-button"
                icon={<AiOutlineEye />}
            ></IconButton>
            <Modal
                size={"full"}
                isCentered
                onClose={onClose}
                isOpen={isOpen}
                motionPreset="slideInBottom"
            >
                <ModalOverlay />
                <ModalContent  >
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Table size="lg" variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th>Exercise</Th>
                                        <Th>Weight</Th>
                                        <Th>Sets x Reps</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td>inches</Td>
                                        <Td>millimetres (mm)</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>feet</Td>
                                        <Td>centimetres (cm)</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>yards</Td>
                                        <Td>metres (m)</Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </Box>

                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
            </Button>
                        <Button variant="ghost">Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </React.Fragment>
    );
}
export default WorkoutModal