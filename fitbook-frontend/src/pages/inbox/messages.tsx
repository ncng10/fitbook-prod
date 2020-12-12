import { Box } from '@chakra-ui/react';
import React from 'react'
import { useInboxMessagesQuery } from '../../generated/graphql';
import NextLink from "next/link"
import { withApollo } from '../../utils/withApollo';
interface messagesProps {

}

const Messages: React.FC<messagesProps> = ({ }) => {
    const { data } = useInboxMessagesQuery();
    return (
        <React.Fragment>
            <Box w={100} h={30} backgroundColor={"lightblue"}>
                {data?.inboxMessages.map((message) => (
                    <NextLink href="/inbox/message/[id]" as={`/inbox/message/${message.senderId}`}>
                        <Box>{message.sender}</Box>
                    </NextLink>
                ))}
            </Box>
        </React.Fragment>
    );
}
export default withApollo({ ssr: false })(Messages)