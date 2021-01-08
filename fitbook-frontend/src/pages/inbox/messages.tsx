import { Box } from '@chakra-ui/react';
import React from 'react'
import { useInboxMessagesQuery, useMeQuery } from '../../generated/graphql';
import NextLink from "next/link"
import { withApollo } from '../../utils/withApollo';
import { NavBar } from '../../components/NavBar';
import BottomNavigation from '../../components/MobileViews/BottomNavigation';
import { Button } from '@material-ui/core';
interface messagesProps {

}

const Messages: React.FC<messagesProps> = ({ }) => {
    const { data } = useInboxMessagesQuery();
    const { data: meData } = useMeQuery();
    return (
        <React.Fragment>
            <Box >
                Messages won't show until the recipient replies.
                {data?.inboxMessages.map((message) => (
                <NextLink href="/inbox/message/[id]" as={`/inbox/message/${message.senderId === meData?.me.id ? message.recipientId : message.senderId}`}>
                    <Box
                        ml="3rem"
                        bgColor="gray.500"
                        w={400}
                        h={100}
                        mt={5}
                    >
                        {message.senderId === meData?.me.id ? message.recipient : message.sender}
                    </Box>
                </NextLink>
            ))}
            </Box>
            <Box>
                <Button>New Message</Button>
            </Box>
            <BottomNavigation />
        </React.Fragment>
    );
}
export default withApollo({ ssr: false })(Messages)