import { Button, Input, useToast, VStack } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import React from 'react'
import { useCreateProgramMutation } from '../generated/graphql';
import { InputField } from './InputField';

interface CreateProgramFormProps {

}

const CreateProgramForm: React.FC<CreateProgramFormProps> = ({ }) => {

    const [createProgram] = useCreateProgramMutation();
    const toast = useToast()
    return (
        <React.Fragment>
            <Formik
                initialValues={{ programName: "", programCategory: "" }}
                onSubmit={async (values) => {
                    const { errors } = await createProgram({
                        variables: {
                            input: values
                        },
                        update: (cache) => {
                            cache.evict({ fieldName: "myPrograms" });
                        }
                    })
                    if (!errors) {
                        toast({
                            position: "bottom-left",
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
export default CreateProgramForm