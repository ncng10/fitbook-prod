import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, IconButton, Stack, useDisclosure, VStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import { RiMenuAddLine } from 'react-icons/ri';
import { useCreateWorkoutMutation } from "../../../generated/graphql";
import { useGetIntId } from '../../../utils/useGetIntId';
import { InputField } from '../../InputField';
import * as Yup from 'yup';

interface CreateWorkoutFormProps {

}

const CreateWorkoutForm: React.FC<CreateWorkoutFormProps> = ({ }) => {
    const CreateWorkoutValidation = Yup.object().shape({
        workoutName: Yup.string()
            .max(50, 'Program names can only be 50 characters.')
            .required('You must enter a name.'),
        workoutCategory: Yup.string()
            .max(50, 'Cannot be more than 50 characters.')
    })
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef();
    const intId = useGetIntId();
    const [addWorkout] = useCreateWorkoutMutation();
    return (
        <React.Fragment>
            <Box>
                <IconButton
                    position="fixed"
                    bottom={75}
                    right={25}
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
                                Add A Workout
        </DrawerHeader>

                            <DrawerBody>
                                <Stack spacing="24px">
                                    <Formik
                                        validationSchema={CreateWorkoutValidation}
                                        initialValues={{ workoutName: "", workoutCategory: "", workoutDate: "" }}
                                        onSubmit={async (values) => {
                                            await addWorkout({
                                                variables: {
                                                    input: {
                                                        programIdentity: intId,
                                                        workoutCategory: values.workoutCategory,
                                                        workoutName: values.workoutName,
                                                        workoutDate: values.workoutDate
                                                    }

                                                },
                                                update: (cache) => {
                                                    cache.evict({ fieldName: "workouts" });
                                                }
                                            })
                                        }}

                                    >
                                        <Form>
                                            <VStack spacing="25px">
                                                <InputField
                                                    label="Workout Name"
                                                    name="workoutName"
                                                    placeholder="Workout Name"
                                                />
                                                <InputField
                                                    label="Workout Category"
                                                    name="workoutCategory"
                                                    placeholder="Workout Category"
                                                />
                                                <InputField
                                                    label="Workout Date"
                                                    name="workoutDate"
                                                    placeholder="Workout Date"
                                                />
                                                <Button type="submit">Create</Button>
                                            </VStack>
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
export default CreateWorkoutForm