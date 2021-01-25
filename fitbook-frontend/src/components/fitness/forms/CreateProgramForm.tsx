import { Button, useToast, VStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import { useCreateProgramMutation } from '../../../generated/graphql';
import { InputField } from '../../InputField';
import * as Yup from 'yup';
interface CreateProgramFormProps {

}

const CreateProgramForm: React.FC<CreateProgramFormProps> = ({ }) => {
    const CreateProgramValidation = Yup.object().shape({
        programName: Yup.string()
            .max(50, 'Program names can only be 50 characters.')
            .required('You must enter a name.'),
        programCategory: Yup.string()
            .max(50, 'Cannot be more than 50 characters.')
    })
    const [createProgram] = useCreateProgramMutation();
    const toast = useToast()
    return (
        <React.Fragment>
            <Formik
                validationSchema={CreateProgramValidation}
                initialValues={{ programName: "", programCategory: "" }}
                onSubmit={async (values) => {
                    const { errors } = await createProgram({
                        variables: {
                            input: values
                        },
                        update: (cache) => {
                            cache.evict({ fieldName: "myPrograms" });
                            cache.evict({ fieldName: "personalFeedItems" });
                        },
                    })
                    if (!errors) {
                        toast({
                            position: "top-right",
                            title: "Program created.",
                            description: `Successfully added a program, titled: '${values.programName}'.`,
                            status: "success",
                            duration: 6000,
                            isClosable: true
                        });
                    }
                }}
            >
                <Form>
                    <VStack spacing="25px">
                        <InputField
                            label="Program Name"
                            name="programName"
                            placeholder="Program Name"
                            required={true}
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
export default CreateProgramForm