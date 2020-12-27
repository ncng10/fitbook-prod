import React from 'react'
import BottomNavigation from '../components/MobileViews/BottomNavigation';
import PageHeaders from '../components/MobileViews/PageHeaders';
import { useNewSharedProgramSubscription } from "../generated/graphql"
import { withApollo } from '../utils/withApollo';

interface NotificationsProps {

}

const Notifications: React.FC<NotificationsProps> = ({ }) => {


    return (
        <React.Fragment>
            <PageHeaders>Notifications</PageHeaders>
            <BottomNavigation />
        </React.Fragment>
    );
}
export default withApollo({ ssr: false })(Notifications)