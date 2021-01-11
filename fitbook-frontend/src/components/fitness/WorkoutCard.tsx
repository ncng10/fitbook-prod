import { Box, Flex } from '@chakra-ui/react';
import React from 'react'
import { RiLock2Line, RiGlobalLine, RiGroupLine, RiLockLine } from 'react-icons/ri';
import { MdFitnessCenter } from 'react-icons/md'
interface WorkoutCardProps {
    workoutName: string;
    workoutCategory: string;
    isShared?: boolean;
    workoutDate?: string;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workoutName, workoutCategory, isShared, workoutDate }) => {
    return (
        <React.Fragment>
            <Box
                className="overall-swipeable-object"
                display="flex"
                flexDirection="column"
                borderRadius="15px"
            >
                <Flex direction="column">
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                    </Box>
                    <Box
                        height={200}
                        w={250}
                        display="flex"
                        alignItems="center"
                        flexDir="column"
                        backgroundColor="#3C3D66"
                        borderRadius={10}
                        color="#DADDE9"
                    >
                        <Flex alignItems="center" flexDir="row" mt={3} justifyContent="space-between" width="100%">
                            <Box h="100%" ml={3}>{workoutCategory ? workoutCategory : "Uncategorized"}</Box>
                            <Box mr={3}>
                                {isShared ? <RiGroupLine /> : <RiLockLine />}
                            </Box>
                        </Flex>
                        <Box flexWrap="wrap" display="flex" alignItems="center" flexDir="column" justifyContent="center" h="100%">
                            <Box fontSize={28} fontWeight={650}>{workoutName}</Box>
                            <Box fontSize={16} fontWeight={650}>{workoutDate}</Box>
                        </Box>
                    </Box>
                </Flex>
            </Box>
        </React.Fragment>
    );
}
export default WorkoutCard