import { Box } from '@chakra-ui/react';
import React from 'react'
import { RiLock2Line, RiGlobalLine } from 'react-icons/ri';

interface WorkoutCardProps {
    workoutName: string;
    workoutCategory: string;
    isShared?: boolean
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workoutName, workoutCategory, isShared }) => {
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
                    <Box>
                        {workoutCategory}
                    </Box>

                </Box>

                <Box
                    height={205}
                    w={265}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    backgroundColor="#fafafa"
                    borderRadius={10}
                >
                    <Box>
                        {workoutName}
                    </Box>
                </Box>
            </Box>
        </React.Fragment>
    );
}
export default WorkoutCard