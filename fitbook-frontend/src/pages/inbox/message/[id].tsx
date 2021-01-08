import { Avatar, Box, Button, Flex, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { InputField } from '../../../components/InputField';
import { useMeQuery, useNewMessageSubscription, usePublicUserProfileQuery, useSendPersonalMessageMutation, useUserProfileQuery, useViewPersonalMessagesQuery, useWhoIAmMessagingQuery } from '../../../generated/graphql';
import { useGetIntId } from '../../../utils/useGetIntId';
import { withApollo } from '../../../utils/withApollo';
interface MessageProps {

}

const Message: React.FC<MessageProps> = ({ }) => {
    const intId = useGetIntId();
    const { data: meData } = useMeQuery();
    const [sendMessage] = useSendPersonalMessageMutation();
    const { data: whoIAmMessagingData } = useWhoIAmMessagingQuery({
        variables: {
            userId: intId
        }
    })
    const lastMessage = useRef(null);
    const { data, refetch } = useViewPersonalMessagesQuery({
        skip: intId === -1,
        variables: {
            input: intId,
        },
        fetchPolicy: "network-only"
    });

    const { data: newMessage, loading, error } = useNewMessageSubscription();
    useEffect(() => {
        refetch({
            input: intId
        })
    }, [newMessage]);
    const scrollToRef = (ref) => ref?.current.scrollIntoView();
    useEffect(() => {
        scrollToRef(lastMessage)
    }, [newMessage, data])
    return (
        <React.Fragment>
            <Box width="100%" display="flex" alignItems="center" justifyContent="center" bgColor="#FFFFFF" height="50px">
                <Box >
                    <Avatar src={`https://storage.googleapis.com/fitbook-production/${whoIAmMessagingData?.whoIAmMessaging.profilePicture}`} />
                </Box>
                <Box ml={2} > {whoIAmMessagingData?.whoIAmMessaging.username}</Box>
            </Box>
            <Box h="70vh" overflowX="scroll" >
                <Box display="flex" width="100%" flexDir="column" overflow="scroll" overflowX="hidden">
                    {data?.viewPersonalMessages.map((m) => {
                        return (
                            m.senderId === meData?.me.id
                                ?
                                <Box alignSelf="flex-end"  >
                                    <Box mr={3} mt={2} borderRadius="15px" alignSelf="flex-end" padding="1rem" width="10rem" bg='blue.500'>
                                        <Text color="white">{m.text}</Text>
                                    </Box>
                                    <Box width="100%" display="flex" flexDir="row" alignItems="center" justifyContent="center">
                                        <Box>  {new Date(parseInt(m.createdAt)).toLocaleString()}</Box>
                                    </Box>
                                </Box>
                                :
                                <Box >
                                    <Box mt={2} ml={3} borderRadius="15px" padding="1rem" width="10rem" bg='purple.500'>
                                        <Text color="white">{m.text}</Text>

                                    </Box>
                                    <Box ml={3}>{new Date(parseInt(m.createdAt)).toLocaleString()}</Box>
                                </Box>

                        )
                    })}
                </Box>
                <div ref={lastMessage}></div>
            </Box>
            <Box w="100%" display="flex" alignItems="center" justifyContent="center" h="25vh">
                <Formik
                    initialValues={{ text: "" }}
                    onSubmit={async (values, { resetForm }) => {
                        const { errors } = await sendMessage({
                            variables: { text: values, recipientId: intId },
                            update: (cache) => {
                                cache.evict({ fieldName: "viewPersonalMessages" })
                            },
                        });
                        if (!errors) {
                            resetForm()
                        }
                    }}
                >
                    <Form>
                        <Box w={350} >
                            <InputField
                                height={100}
                                width="100%"
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
        </React.Fragment >
    );
}
export default withApollo({ ssr: false })(Message)