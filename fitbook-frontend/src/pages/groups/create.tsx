import { Box, Button, FormControl, FormLabel } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { InputField } from '../../components/InputField';
import { useCreateGroupMutation } from '../../generated/graphql'
import { withApollo } from '../../utils/withApollo';
interface createProps {

}

const create: React.FC<createProps> = ({ }) => {
    const [createGroup] = useCreateGroupMutation();
    return (
        <React.Fragment>
            <Box w={300} h={500}>
                <Formik
                    initialValues={{ groupName: "", groupCategory: "" }}
                    onSubmit={async (values) => {
                        await createGroup({
                            variables: { input: values }
                        })
                        console.log(values)
                    }}
                >
                    <Form>
                        <InputField
                            label="Group Name"
                            name="groupName"
                            placeholder="Group Name"
                        />
                        <InputField
                            label="Group Category (optional)"
                            name="groupCategory"
                            placeholder="Group Category (optional)"
                        />
                        <Button type="submit">Create Group</Button>
                    </Form>
                </Formik>
            </Box>
        </React.Fragment>
    );
}
export default withApollo({ ssr: false })(create)