import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, IconButton, Stack, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import CreateProgramForm from './forms/CreateProgramForm';

interface ProgramMenuProps {

}

const ProgramMenu: React.FC<ProgramMenuProps> = ({ }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef()


    return (
        <React.Fragment>
            <IconButton
                onClick={onOpen}
                style={{ fontSize: 25, width: "100%", backgroundColor: "#FFFFFF", outline: "none" }}
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