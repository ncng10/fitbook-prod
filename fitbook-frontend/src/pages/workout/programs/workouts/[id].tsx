import { Box } from '@chakra-ui/react';
import React from 'react'
import { useWorkoutQuery } from '../../../../generated/graphql';
import { useGetIntId } from '../../../../utils/useGetIntId';
import { withApollo } from '../../../../utils/withApollo';

interface WorkoutProps {

}

const Workout: React.FC<WorkoutProps> = ({ }) => {
    const intId = useGetIntId();
    const { data, loading, error } = useWorkoutQuery({
        skip: intId === -1,
        variables: {
            workoutId: intId
        }
    });

    let body;
    if (!data) {
        body =
            <Box>No Workouts, add one.</Box>
    }
    if (data) {
        body =
            <Box>
                {data?.workout.id}
            </Box>
    }

    return (
        <React.Fragment>
            {body}
        </React.Fragment>
    );
}
export default withApollo({ ssr: false })(Workout)