import { Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Stack, Box, FormLabel, Input, InputGroup, InputLeftAddon, InputRightAddon, Select, Textarea, DrawerFooter, useDisclosure, IconButton } from '@chakra-ui/react';
import React from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai';
import CreateProgramForm from './CreateProgramForm';

interface ProgramMenuProps {

}

const ProgramMenu: React.FC<ProgramMenuProps> = ({ }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef()
    return (
        <React.Fragment>
            <IconButton
                colorScheme="teal" onClick={onOpen}
                aria-label="home-button"
                icon={<AiOutlinePlusCircle fontSize={25} />}
                bgColor="teal.500"
            />
            <Drawer
                isOpen={isOpen}
                placement="right"
                initialFocusRef={firstField}
                onClose={onClose}
            >
                <DrawerOverlay>
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader borderBottomWidth="1px">
                            Create a New Program
                        </DrawerHeader>
                        <DrawerBody>
                            <Stack spacing="24px">
                                <CreateProgramForm />
                            </Stack>
                        </DrawerBody>

                        <DrawerFooter borderTopWidth="1px">
                            <Button variant="outline" mr={3} onClick={onClose}>
                                Cancel
              </Button>
                        </DrawerFooter>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </React.Fragment>
    );
}
export default ProgramMenu