import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { RiGlobalLine, RiGroupLine, RiLock2Line, RiLockLine } from 'react-icons/ri';
import { useUserProfileQuery } from '../../generated/graphql';

interface ProgramCardProps {
    programName: string;
    creator?: string; //only programs shared with the user shows the creator. 
    programCategory: string;
    isShared: boolean;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ programCategory, programName, creator, isShared }) => {
    const { data } = useUserProfileQuery();
    return (
        <React.Fragment>
            <Box
                className="overall-swipeable-object"
                display="flex"
                flexDirection="column"
                borderRadius="15px"
            >
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                </Box>
                <Box
                    height={210}
                    w={260}
                    display="flex"
                    alignItems="center"
                    flexDir="column"
                    backgroundColor="#3C3D66"
                    borderRadius={10}
                    color="#DADDE9"
                >
                    <Flex alignItems="center" flexDir="row" mt={3} justifyContent="space-between" width="100%">
                        <Box h="100%" ml={3}>{programCategory ? programCategory : "Uncategorized"}</Box>
                        <Box mr={3}>
                            {isShared ? <RiGroupLine /> : <RiLockLine />}
                        </Box>
                    </Flex>
                    <Box ml={3} mt={5} flexWrap="wrap" display="flex" alignItems="center" justifyContent="center" h="100%">
                        <Box fontSize={28} fontWeight={650}>{programName}</Box>
                    </Box>
                    <Box ml={7} display="flex" alignItems="center" justifyContent="flex-start" width="100%" h="100%">
                        {creator !== data?.userProfile.username ? <h3>Shared by: {creator}</h3> : creator}
                    </Box>
                </Box>
            </Box>
        </React.Fragment>
    );
}
export default ProgramCard