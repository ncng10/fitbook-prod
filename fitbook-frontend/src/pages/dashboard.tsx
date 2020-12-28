import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import BottomNavigation from '../components/MobileViews/BottomNavigation';
import PageHeaders from '../components/MobileViews/PageHeaders';
import { useUserProfileQuery } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';

interface dashboardProps {

}

const Dashboard: React.FC<dashboardProps> = ({ }) => {
    const { data } = useUserProfileQuery();
    const router = useRouter();
    useEffect(() => {
        if (!data?.userProfile) {
            router.push("/login")
        }
    });
    return (
        <React.Fragment>
            <PageHeaders>Dashboard</PageHeaders>
            <BottomNavigation />
        </React.Fragment>);
}
export default withApollo({ ssr: false })(Dashboard)