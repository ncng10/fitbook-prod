import React from 'react'
import BottomNavigation from '../components/MobileViews/BottomNavigation';
import Feed from '../components/MobileViews/Feed';
import { withApollo } from '../utils/withApollo';

interface HistoryProps {

}

const History: React.FC<HistoryProps> = ({ }) => {
    return (
        <React.Fragment>
            <Feed />
            <BottomNavigation />
        </React.Fragment>
    );
}
export default withApollo({ ssr: false })(History)