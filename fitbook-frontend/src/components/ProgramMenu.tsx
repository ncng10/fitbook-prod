import { Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Stack, Box, FormLabel, Input, InputGroup, InputLeftAddon, InputRightAddon, Select, Textarea, DrawerFooter, useDisclosure, IconButton } from '@chakra-ui/react';
import React from 'react'
import { AiOutlinePlus, AiOutlinePlusCircle } from 'react-icons/ai';
import CreateProgramForm from './CreateProgramForm';

interface ProgramMenuProps {

}

const ProgramMenu: React.FC<ProgramMenuProps> = ({ }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef()


    return (
        <React.Fragment>
            <IconButton
                borderRadius={50}
                onClick={onOpen}
                aria-label="home-button"
                icon={<AiOutlinePlus fontSize={25} />}

            />
            <Drawer
                isOpen={isOpen}
                placement="bottom"
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