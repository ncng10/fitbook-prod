import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { InputField } from '../../../components/InputField';
import { useMeQuery, useNewMessageSubscription, useSendPersonalMessageMutation, useViewPersonalMessagesQuery } from '../../../generated/graphql';
import { useGetIntId } from '../../../utils/useGetIntId';
import { withApollo } from '../../../utils/withApollo';
import Messages from "../messages";
interface MessageProps {

}

const Message: React.FC<MessageProps> = ({ }) => {
    const intId = useGetIntId();
    const { data: meData } = useMeQuery();
    console.log(intId);
    const [sendMessage] = useSendPersonalMessageMutation();

    const { data, refetch } = useViewPersonalMessagesQuery({
        skip: intId === -1,
        variables: {
            input: intId,
        },
    });
    const { data: newMessage, loading, error } = useNewMessageSubscription({

    });

    if (newMessage?.newMessage) {
        refetch
    }
    console.log(newMessage)
    return (
        <React.Fragment>
            <Box >
                <Messages />
                <Box overflow="scroll" overflowX="hidden">
                    {data?.viewPersonalMessages.map((m) => (
                        m.senderId === meData?.me.id
                            ?
                            <Box >
                                <Box borderRadius="30px" padding="1rem" width="10rem" bg='blue.500' mr={5}>
                                    <Text color="white">{m.text}</Text>
                                </Box>
                            </Box>
                            :
                            <Box   >
                                <Box borderRadius="30px" padding="1rem" width="10rem" bg='purple.500'>
                                    <Text color="white">{m.text}</Text>
                                </Box>
                            </Box>

                    ))}
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
                                return null
                            }
                        }}
                    >
                        <Form>
                            <Box >
                                <InputField
                                    height={100}
                                    name="text"
                                    placeholder="Text"
                                    label="Message"
                                />
                                <Flex >
                                    <Button bg="orange.500" w={100} mr={5} mt={2} type="submit">Send</Button>
                                </Flex>
                            </Box>
                        </Form>
                    </Formik>
                </Box>
            </Box>
        </React.Fragment>
    );
}
export default withApollo({ ssr: false })(Message)