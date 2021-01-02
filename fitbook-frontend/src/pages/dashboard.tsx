import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import BottomNavigation from '../components/MobileViews/BottomNavigation';
import PageHeaders from '../components/MobileViews/PageHeaders';
import { usePersonalFeedItemsQuery, useUserProfileQuery, useFriendsFeedItemsQuery } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';
import { BottomNavigation as BNMUI } from "@material-ui/core";
import { Box, IconButton } from '@chakra-ui/react';
import { RiGlobalLine, RiUserLine } from 'react-icons/ri';


interface dashboardProps {

}

const Dashboard: React.FC<dashboardProps> = ({ }) => {
    const { data } = useUserProfileQuery();
    const [personalFeedActive, setPersonalFeedActive] = useState(true);
    const router = useRouter();
    useEffect(() => {
        if (!data?.userProfile) {
            router.push("/login")
        }
    });
    return (
        <React.Fragment>
            <PageHeaders>Dashboard</PageHeaders>
            {personalFeedActive ? <BNMUI style={{ marginTop: 10 }}>
                <IconButton fontSize={25} backgroundColor="#FFFFFF" width="100%" color="#86574d" aria-label="friend-requests" icon={<RiUserLine />} />
                <IconButton onClick={() => setPersonalFeedActive(false)} fontSize={25} backgroundColor="#FFFFFF" width="100%" aria-label="shared-programs" icon={<RiGlobalLine />} />
            </BNMUI>
                :
                <BNMUI style={{ marginTop: 10 }}>
                    <IconButton onClick={() => setPersonalFeedActive(true)} fontSize={25} backgroundColor="#FFFFFF" width="100%" aria-label="friend-requests" icon={<RiUserLine />} />
                    <IconButton fontSize={25} backgroundColor="#FFFFFF" width="100%" aria-label="shared-programs" color="#86574d" icon={<RiGlobalLine />} />
                </BNMUI>
            }
            <BottomNavigation />
        </React.Fragment>);
}
export default withApollo({ ssr: false })(Dashboard)