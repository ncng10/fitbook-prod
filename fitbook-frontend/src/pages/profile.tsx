import { Box, Flex, IconButton } from '@chakra-ui/react';
import React, { useState } from 'react';
import BottomNavigation from '../components/MobileViews/BottomNavigation';
import UserProfileCard from '../components/MobileViews/UserProfileCard';
import ProgramsCarousel from '../components/fitness/ProgramsCarousel';
import SharedProgramsCarousel from '../components/fitness/SharedProgramsCarousel';
import { withApollo } from '../utils/withApollo';
import { BottomNavigation as BNMUI } from "@material-ui/core";
import { RiLock2Line, RiGlobalLine, RiUserLine } from 'react-icons/ri';

interface ProfileProps {

}

const Profile: React.FC<ProfileProps> = ({ }) => {

    const [myPrograms, setMyPrograms] = useState(true)

    return (
        <React.Fragment>
            <UserProfileCard />
            <Box mt={5}>
                {myPrograms ?
                    <BNMUI style={{ marginTop: 10, width: "100%" }}>
                        <Box cursor="pointer" display="flex" justifyContent="center" alignItems="center" flexDir="column" fontSize={25} backgroundColor="#FFFFFF" borderBottom="1px solid lightgray" width="100%" color="#86574d" aria-label="friend-requests" >
                            <RiUserLine />
                            <Box fontSize={15}>My Programs</Box>
                        </Box>
                        <Box cursor="pointer" display="flex" justifyContent="center" alignItems="center" onClick={() => setMyPrograms(false)} fontSize={25} backgroundColor="#FFFFFF" width="100%" aria-label="shared-programs" >
                            <RiGlobalLine />
                        </Box>
                    </BNMUI>
                    :
                    <BNMUI style={{ marginTop: 10 }}>
                        <Box cursor="pointer" display="flex" justifyContent="center" alignItems="center" onClick={() => setMyPrograms(true)} fontSize={25} backgroundColor="#FFFFFF" width="100%" aria-label="friend-requests" >
                            <RiUserLine />
                        </Box>
                        <Box cursor="pointer" display="flex" justifyContent="center" flexDir="column" alignItems="center" fontSize={25} backgroundColor="#FFFFFF" borderBottom="1px solid lightgray" width="100%" aria-label="shared-programs" color="#86574d" >
                            <RiGlobalLine />
                            <Box fontSize={15}>Shared to Me</Box>
                        </Box>
                    </BNMUI>
                }
                {myPrograms ?
                    <Box>
                        <ProgramsCarousel />
                    </Box>
                    :
                    <Box >
                        <SharedProgramsCarousel />
                    </Box>
                }
            </Box>
            <BottomNavigation />
        </React.Fragment>
    );
};

export default withApollo({ ssr: true })(Profile)