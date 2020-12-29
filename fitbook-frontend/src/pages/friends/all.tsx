import { Box } from '@chakra-ui/react';
import React from 'react';
import BottomNavigation from '../../components/MobileViews/BottomNavigation';
import FriendsList from '../../components/MobileViews/FriendsList';
import { withApollo } from '../../utils/withApollo';
interface AllProps {

}

const All: React.FC<AllProps> = ({ }) => {

    return (
        <React.Fragment>
            <Box height="150vh" >
                <FriendsList />
            </Box>
            <BottomNavigation />
        </React.Fragment>
    );
}
export default withApollo({ ssr: false })(All)