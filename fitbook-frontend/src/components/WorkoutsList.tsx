import { Box } from '@chakra-ui/react';
import React from 'react'
import { useWorkoutsQuery } from '../generated/graphql';
import { useGetIntId } from '../utils/useGetIntId';

interface WorkoutsListProps {

}

const WorkoutsList: React.FC<WorkoutsListProps> = ({ }) => {
    const intId = useGetIntId()
    const { data, loading, error } = useWorkoutsQuery({
        skip: intId === -1,
        variables: {
            programId: intId
        }
    });

    let body;
    if (!data) {
        body =
            <Box>
                Couldn't load workouts for some reason.
        </Box>
    } else if (!data?.workouts) {
        body =
            <Box>
                No workouts in this program... try adding some.
        </Box>
    } else {
        body =
            <Box>
                {data?.workouts.map((workout) => (
                    <Box>{workout.workoutName}</Box>
                ))}
            </Box>
    }

    return (
        <React.Fragment>
            {body}
        </React.Fragment>
    );
}
export default WorkoutsList