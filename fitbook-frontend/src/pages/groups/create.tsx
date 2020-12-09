import { Box, Button, FormControl, FormLabel } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik'
import { useRouter } from 'next/router';
import React from 'react'
import { InputField } from '../../components/InputField';
import { useCreateGroupMutation } from '../../generated/graphql'
import { withApollo } from '../../utils/withApollo';
interface createProps {

}

const create: React.FC<createProps> = ({ }) => {
    const [createGroup] = useCreateGroupMutation();
    const router = useRouter();
    return (
        <React.Fragment>
            <Box w={300} h={500}>
                <Formik
                    initialValues={{ groupName: "", groupCategory: "" }}
                    onSubmit={async (values) => {
                        const { errors } = await createGroup({
                            variables: { input: values },
                            update: (cache) => {
                                cache.evict({ fieldName: "groups" });
                            }
                        })
                        console.log(values)
                        if (!errors) {
                            router.push("/groups/all")
                        }
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