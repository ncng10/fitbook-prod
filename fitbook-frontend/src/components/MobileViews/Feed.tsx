import { Box } from '@chakra-ui/react';
import React from 'react';
import { useFriendsFeedItemsQuery, usePersonalFeedItemsQuery } from '../../generated/graphql';

interface FeedProps {
    personalFeedActive: boolean;
}

const Feed: React.FC<FeedProps> = ({ personalFeedActive }) => {
    const { data: globalFeedData } = useFriendsFeedItemsQuery();
    const { data: feedItemsData } = usePersonalFeedItemsQuery();
    let body;
    return (
        <React.Fragment>
            <Box h="78vh" overflowY="scroll">
                {personalFeedActive ?
                    <Box >
                        your feed:
                    {feedItemsData?.personalFeedItems.map((feedItem) => {
                        if (feedItem.notificationKey === 0) //notification key === 0 means it is a new program
                        {
                            return (<Box mb={2} bgColor="#fafafa">
                                <Box>You created a program.</Box>
                                <p>{feedItem.createdAt}</p> <p>{feedItem.timeStamp}</p>
                            </Box>
                            )
                        }
                    })}
                    </Box> :
                    <Box >
                        global feed:
                    {globalFeedData?.friendsFeedItems.map((globalFeedItem) => {
                        if (globalFeedItem.notificationKey === 0) //notification key === 0 means it is a new program
                        {
                            return (
                                <Box mb={2} bgColor="#fafafa">
                                    <Box>{globalFeedItem.user} created a program.</Box>
                                    <p>{globalFeedItem.createdAt}</p> <p>{globalFeedItem.timeStamp}</p>
                                </Box>
                            )
                        }
                    })}
                    </Box>
                }
            </Box>
        </React.Fragment>
    );
}
export default Feed