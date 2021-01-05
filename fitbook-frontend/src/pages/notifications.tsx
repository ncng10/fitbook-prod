import { IconButton } from '@chakra-ui/react';
import { BottomNavigation as BNMUI } from "@material-ui/core";
import React, { useState } from 'react';
import { RiFileList2Line, RiUserFollowLine } from 'react-icons/ri';
import BottomNavigation from '../components/MobileViews/BottomNavigation';
import FriendRequests from '../components/MobileViews/FriendRequests';
import NewProgramShare from '../components/MobileViews/NewProgramShare';
import PageHeaders from '../components/MobileViews/PageHeaders';
import { withApollo } from '../utils/withApollo';

interface NotificationsProps {

}


const Notifications: React.FC<NotificationsProps> = ({ }) => {
    const [friendRequestTabActive, setFriendRequestTabActive] = useState(true)
    return (
        <React.Fragment>
            <PageHeaders>Notifications</PageHeaders>
            {friendRequestTabActive ? <BNMUI style={{ marginTop: 10 }}>
                <IconButton fontSize={25} backgroundColor="#FFFFFF" width="100%" color="#3C3D66" aria-label="friend-requests" icon={<RiUserFollowLine />} />
                <IconButton onClick={() => setFriendRequestTabActive(false)} fontSize={25} backgroundColor="#FFFFFF" width="100%" aria-label="shared-programs" icon={<RiFileList2Line />} />
            </BNMUI>
                :
                <BNMUI style={{ marginTop: 10 }}>
                    <IconButton onClick={() => setFriendRequestTabActive(true)} fontSize={25} backgroundColor="#FFFFFF" width="100%" aria-label="friend-requests" icon={<RiUserFollowLine />} />
                    <IconButton fontSize={25} backgroundColor="#FFFFFF" width="100%" aria-label="shared-programs" color="#3C3D66" icon={<RiFileList2Line />} />
                </BNMUI>
            }
            {friendRequestTabActive ?
                <FriendRequests />
                : <NewProgramShare />}
            <BottomNavigation />
        </React.Fragment>
    );
}
export default withApollo({ ssr: false })(Notifications)