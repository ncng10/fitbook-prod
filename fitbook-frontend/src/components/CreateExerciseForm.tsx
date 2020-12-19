import { AddIcon } from '@chakra-ui/icons'
import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, IconButton, FormLabel, Input, InputGroup, InputLeftAddon, InputRightAddon, Select, Stack, Textarea, useDisclosure } from '@chakra-ui/react'
import { Button } from '@material-ui/core'
import { Form, Formik } from 'formik'
import React from 'react'
import { RiMenuAddLine } from 'react-icons/ri'
import { useAddExerciseToWorkoutMutation } from '../generated/graphql'
import { useGetIntId } from '../utils/useGetIntId'
import { InputField } from './InputField'

interface CreateExerciseFormProps {

}

const CreateExerciseForm: React.FC<CreateExerciseFormProps> = ({ }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef();
    const intId = useGetIntId();
    const [addExercise] = useAddExerciseToWorkoutMutation();

    return (
        <React.Fragment>
            <Box>
                <IconButton
                    // position="fixed"
                    // bottom={45}
                    // right={25}
                    height={55}
                    width={55}
                    borderRadius={30}
                    mt={5}
                    mb={5}
                    outline="none"
                    color="#353535"
                    boxShadow=" 5px 0px 15px -10px #52575a;"
                    size="lg"
                    fontSize={35}
                    aria-label="add-exercise-button"
                    onClick={onOpen}
                    icon={<RiMenuAddLine />}
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
                                Add An Exercise
            </DrawerHeader>

                            <DrawerBody>
                                <Stack spacing="24px">
                                    <Formik
                                        initialValues={{
                                            exerciseName: "",
                                            weight: "0",
                                            reps: "0",
                                            sets: "0",
                                            time: "0",
                                            rpe: "0",
                                            workoutIdentity: intId,
                                            notes: "",

                                        }}
                                        onSubmit={async (values) => {
                                            await addExercise({
                                                variables: { inputs: values },
                                                update: (cache) => {
                                                    cache.evict({ fieldName: "exercisesInAWorkout" });
                                                }
                                            });
                                        }}
                                    >
                                        <Form>
                                            <InputField
                                                name="exerciseName"
                                                label="Exercise Name"
                                                placeholder="Exercise Name"
                                            />
                                            <InputField
                                                name="weight"
                                                label="Weight"
                                                placeholder="Weight"
                                            />
                                            <InputField
                                                name="reps"
                                                label="Reps"
                                                placeholder="Reps"
                                            />
                                            <InputField
                                                name="sets"
                                                label="Sets"
                                                placeholder="Sets"
                                            />
                                            <InputField
                                                name="time"
                                                label="Time"
                                                placeholder="Time"
                                            />
                                            <InputField
                                                name="rpe"
                                                label="RPE"
                                                placeholder="RPE"
                                            />
                                            <InputField
                                                name="notes"
                                                label="Notes"
                                                placeholder="Notes"
                                            />
                                            <Button type="submit" onClick={onClose} >Add</Button>
                                        </Form>
                                    </Formik>
                                </Stack>
                            </DrawerBody>

                            <DrawerFooter borderTopWidth="1px">
                                <Button onClick={onClose}>
                                    Cancel
                                </Button>
                            </DrawerFooter>
                        </DrawerContent>
                    </DrawerOverlay>
                </Drawer>

            </Box>
        </React.Fragment>
    );
}
export default CreateExerciseForm