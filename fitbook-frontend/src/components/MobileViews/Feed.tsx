import React from 'react';
import { usePersonalFeedItemsQuery } from '../../generated/graphql';

interface FeedProps {

}

const Feed: React.FC<FeedProps> = ({ }) => {
    const { data: feedItemsData } = usePersonalFeedItemsQuery();
    return (
        <React.Fragment>

        </React.Fragment>
    );
}
export default Feed