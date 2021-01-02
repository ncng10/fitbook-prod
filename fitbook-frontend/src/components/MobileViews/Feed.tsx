import { Box } from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';
import { usePersonalFeedItemsQuery } from '../../generated/graphql';

interface FeedProps {

}

const Feed: React.FC<FeedProps> = ({ }) => {
    const { data: feedItemsData } = usePersonalFeedItemsQuery();
    let body;
    return (
        <React.Fragment>
            <Box h="80vh" overflowY="scroll">
                <Box >
                    your feed:
                    {feedItemsData?.personalFeedItems.map((feedItem) => {
                    if (feedItem.notificationKey === 0) //notification key === 0 means it is a new program
                    {
                        return (<Box mb={2} h={100} bgColor="#fafafa">
                            <Box>You created a program.</Box>
                            <p>{moment(feedItem.date).fromNow()}</p>

                        </Box>
                        )
                    }
                })}
                </Box>
            </Box>
        </React.Fragment>
    );
}
export default Feed