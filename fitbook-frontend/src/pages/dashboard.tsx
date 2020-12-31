import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import BottomNavigation from '../components/MobileViews/BottomNavigation';
import PageHeaders from '../components/MobileViews/PageHeaders';
import { usePersonalFeedItemsQuery, useUserProfileQuery, useFriendsFeedItemsQuery } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';

interface dashboardProps {

}

const Dashboard: React.FC<dashboardProps> = ({ }) => {
    const { data } = useUserProfileQuery();
    const { data: globalFeedData } = useFriendsFeedItemsQuery();
    const router = useRouter();
    useEffect(() => {
        if (!data?.userProfile) {
            router.push("/login")
        }
    });
    const { data: feedItemsData } = usePersonalFeedItemsQuery();
    return (
        <React.Fragment>
            <PageHeaders>Dashboard</PageHeaders>
            your feed:
            {feedItemsData?.personalFeedItems.map((feedItem) => (
                feedItem.notificationKey === 0 ?
                    <p>{feedItem.user} you created a program.</p>
                    :
                    ""
            ))}
            global feed:
            {globalFeedData?.friendsFeedItems.map((globalFeedItem) => (
                globalFeedItem.notificationKey === 0 ?
                    <p>{globalFeedItem.user} created a program</p> : ""
            ))}
            <BottomNavigation />
        </React.Fragment>);
}
export default withApollo({ ssr: false })(Dashboard)