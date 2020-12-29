import { Box, Flex, IconButton } from '@chakra-ui/react';
import React, { useState } from 'react';
import BottomNavigation from '../components/MobileViews/BottomNavigation';
import UserProfileCard from '../components/MobileViews/UserProfileCard';
import ProgramsCarousel from '../components/fitness/ProgramsCarousel';
import SharedProgramsCarousel from '../components/fitness/SharedProgramsCarousel';
import { withApollo } from '../utils/withApollo';
import { BottomNavigation as BNMUI } from "@material-ui/core";
import { RiLock2Line, RiGlobalLine } from 'react-icons/ri';

interface ProfileProps {

}

const Profile: React.FC<ProfileProps> = ({ }) => {

    const [sharedProgramTab, setSharedProgramTabActive] = useState(false)

    return (
        <React.Fragment>
            <UserProfileCard />
            <Box>
                {sharedProgramTab ? <BNMUI style={{ marginTop: 10 }}>
                    <IconButton fontSize={25} backgroundColor="#FFFFFF" width="100%" color="#86574d" aria-label="friend-requests" icon={<RiLock2Line />} />
                    <IconButton onClick={() => setSharedProgramTabActive(false)} fontSize={25} backgroundColor="#FFFFFF" width="100%" aria-label="shared-programs" icon={<RiGlobalLine />} />
                </BNMUI>
                    :
                    <BNMUI style={{ marginTop: 10 }}>
                        <IconButton onClick={() => setSharedProgramTabActive(true)} fontSize={25} backgroundColor="#FFFFFF" width="100%" aria-label="friend-requests" icon={<RiLock2Line />} />
                        <IconButton fontSize={25} backgroundColor="#FFFFFF" width="100%" aria-label="shared-programs" color="#86574d" icon={<RiGlobalLine />} />
                    </BNMUI>
                }
                {sharedProgramTab ?
                    <Box mt={10}>
                        Your Programs:
         <ProgramsCarousel />
                    </Box>
                    :
                    <Box>
                        Programs Shared with You
            <SharedProgramsCarousel />
                    </Box>
                }
            </Box>
            <BottomNavigation />
        </React.Fragment>
    );
};

export default withApollo({ ssr: true })(Profile)