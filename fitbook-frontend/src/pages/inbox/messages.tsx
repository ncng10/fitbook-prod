import { Box } from '@chakra-ui/react';
import React from 'react'
import { useInboxMessagesQuery } from '../../generated/graphql';
import NextLink from "next/link"
import { withApollo } from '../../utils/withApollo';
import { NavBar } from '../../components/NavBar';
interface messagesProps {

}

const Messages: React.FC<messagesProps> = ({ }) => {
    const { data } = useInboxMessagesQuery();
    return (
        <React.Fragment>
            <NavBar />
            <Box >
                {data?.inboxMessages.map((message) => (
                    <NextLink href="/inbox/message/[id]" as={`/inbox/message/${message.senderId}`}>
                        <Box
                            ml="3rem"
                            bgColor="gray.500"
                            w={400}
                            h={100}
                            mt={5}
                        >{message.sender}
                        </Box>
                    </NextLink>
                ))}
            </Box>
        </React.Fragment>
    );
}
export default withApollo({ ssr: false })(Messages)