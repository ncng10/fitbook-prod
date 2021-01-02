import { Box, Flex, IconButton } from '@chakra-ui/react';
import { BottomNavigation as BNMUI } from "@material-ui/core";
import NextLink from "next/link";
import React, { useState } from 'react';
import { RiMoreLine } from 'react-icons/ri';
import ProgramsCarousel from '../components/fitness/ProgramsCarousel';
import SharedProgramsCarousel from '../components/fitness/SharedProgramsCarousel';
import BottomNavigation from '../components/MobileViews/BottomNavigation';
import UserProfileCard from '../components/MobileViews/UserProfileCard';
import { withApollo } from '../utils/withApollo';
interface ProfileProps {

}

const Profile: React.FC<ProfileProps> = ({ }) => {

    const [myPrograms, setMyPrograms] = useState(true)

    return (
        <React.Fragment>
            <Flex>

            </Flex>
            <Flex width="100%" justifyContent="flex-end">
                {/* <NextLink href="/history">
                    <IconButton mr={2} fontSize={30} bgColor="#FFFFFF" aria-label="user-history-button" icon={<RiHistoryLine />} />
                </NextLink> */}
                <NextLink href="/settings">
                    <IconButton mr={2} mt={2} fontSize={35} bgColor="#FFFFFF" aria-label="user-settings-button" icon={<RiMoreLine />} />
                </NextLink>
            </Flex>
            <Flex justifyContent="center" alignItems="center" height={325} >
                <UserProfileCard />
            </Flex>
            <Box >
                {myPrograms ?
                    <Box>
                        <BNMUI style={{ width: "100%", display: "flex", justifyContent: "flex-start" }}>
                            <Box ml={5} cursor="pointer" display="flex" flexDir="column" fontSize={25} backgroundColor="#FFFFFF" color="#3C3D66" aria-label="friend-requests" >
                                <Box fontSize={16} fontWeight={800} fontStyle="bold">Created by You</Box>
                            </Box>
                            <Box ml={5} cursor="pointer" display="flex" onClick={() => setMyPrograms(false)} fontSize={25} backgroundColor="#FFFFFF" aria-label="shared-programs" >
                                <Box fontSize={16} fontWeight={800} opacity={.5} fontStyle="bold">Shared With You</Box>
                            </Box>
                        </BNMUI>
                        <ProgramsCarousel />
                    </Box>
                    :
                    <Box>
                        <BNMUI style={{ width: "100%", display: "flex", justifyContent: "flex-start" }}>
                            <Box ml={5} onClick={() => setMyPrograms(true)} cursor="pointer" display="flex" flexDir="column" fontSize={25} backgroundColor="#FFFFFF" color="#3C3D66" aria-label="friend-requests" >
                                <Box fontSize={16} fontWeight={800} opacity={.5} fontStyle="bold">Created by You</Box>
                            </Box>
                            <Box cursor="pointer" display="flex" fontSize={25} backgroundColor="#FFFFFF" aria-label="shared-programs" >
                                <Box ml={5} fontSize={16} fontWeight={800} fontStyle="bold">Shared With You</Box>
                            </Box>
                        </BNMUI>
                        <SharedProgramsCarousel />
                    </Box>
                }
            </Box>
            <BottomNavigation />
        </React.Fragment>
    );
};

export default withApollo({ ssr: true })(Profile)