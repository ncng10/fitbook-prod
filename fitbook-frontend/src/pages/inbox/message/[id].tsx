import { useSubscription } from '@apollo/client';
import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { InputField } from '../../../components/InputField';
import { useNewMessageSubscription, useSendPersonalMessageMutation, useViewPersonalMessagesQuery } from '../../../generated/graphql';
import { useGetIntId } from '../../../utils/useGetIntId';
import { withApollo } from '../../../utils/withApollo';

interface MessageProps {

}

const Message: React.FC<MessageProps> = ({ }) => {
    const intId = useGetIntId();
    console.log(intId);
    const [sendMessage] = useSendPersonalMessageMutation();

    const { data } = useViewPersonalMessagesQuery({
        skip: intId === -1,
        variables: {
            input: intId,
        },
    });
    const { data: newMessage, loading, error } = useNewMessageSubscription();

    return (
        <React.Fragment>
            <Box>
                {data?.viewPersonalMessages.map((m) => (
                    <Box>{m.text}</Box>
                ))}
            </Box>
            <Box>

            </Box>
            <Box>
                <Formik
                    initialValues={{ text: "" }}
                    onSubmit={async (values) => {
                        const { errors } = await sendMessage({
                            variables: { input: values, recipientId: intId },
                            update: (cache) => {
                                cache.evict({ fieldName: "viewPersonalMessages" })
                            },
                        });
                        if (!errors) {
                            return
                        }
                    }}
                >
                    <Form>
                        <InputField
                            name="text"
                            placeholder="Text"
                            label="Message"
                        />
                        <Button type="submit">Send</Button>
                    </Form>
                </Formik>
            </Box>
        </React.Fragment>
    );
}
export default withApollo({ ssr: false })(Message)