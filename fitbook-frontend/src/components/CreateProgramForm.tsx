import { Input } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import React from 'react'
import { InputField } from './InputField';

interface CreateProgramFormProps {

}

const CreateProgramForm: React.FC<CreateProgramFormProps> = ({ }) => {
    return (
        <React.Fragment>
            <Formik
                initialValues={{ text: "" }}
                onSubmit={async () => {
                    console.log('hi')
                }}
            >
                <Form>
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
                </Form>
            </Formik>
        </React.Fragment>
    );
}
export default CreateProgramForm