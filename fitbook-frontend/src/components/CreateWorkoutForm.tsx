import { toast, VStack, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import React from 'react'
import { createProgram } from 'typescript';
import { useAddWorkoutToProgramMutation } from '../generated/graphql';
import { useGetIntId } from '../utils/useGetIntId';
import { InputField } from './InputField';

interface CreateWorkoutFormProps {

}

const CreateWorkoutForm: React.FC<CreateWorkoutFormProps> = ({ }) => {

    const intId = useGetIntId();

    const [addWorkout] = useAddWorkoutToProgramMutation({
        variables: {
            input: {
                programId: intId,
            }
        }
    });

    return (
        <React.Fragment>
            <Formik
                initialValues={{ programName: "", programCategory: "" }}
                onSubmit={async (values) => {
                    const { errors } = await addWork({
                        variables: {
                            input: values
                        },
                        update: (cache) => {
                            cache.evict({ fieldName: "myPrograms" });
                        }
                    })
                    if (!errors) {
                        toast({
                            position: "top-right",
                            title: "Program created.",
                            description: `Successfully added a program, titled: '${values.programName}'.`,
                            status: "success",
                            duration: 6000,
                            isClosable: true,
                        })
                    }
                }}
            >
                <Form>
                    <VStack spacing="25px">
                        <InputField
                            label="Program Name"
                            name="programName"
                            placeholder="Program Name"
                        />
                        <InputField
                            label="Program Category"
                            name="programCategory"
                            placeholder="Program Category"
                        />
                        <Button type="submit">Create</Button>
                    </VStack>
                </Form>
            </Formik>
        </React.Fragment>
    );
}
export default CreateWorkoutForm