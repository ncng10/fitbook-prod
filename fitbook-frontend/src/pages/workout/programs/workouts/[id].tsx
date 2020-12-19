import { Box } from '@chakra-ui/react';
import React from 'react'
import ExerciseCard from '../../../../components/ExerciseCard';
import { NavBar } from '../../../../components/NavBar';
import { useExercisesInAWorkoutQuery } from '../../../../generated/graphql';
import { useGetIntId } from '../../../../utils/useGetIntId';
import { withApollo } from '../../../../utils/withApollo';

interface WorkoutProps {

}

const Workout: React.FC<WorkoutProps> = ({ }) => {
    const intId = useGetIntId();
    const { data, loading, error } = useExercisesInAWorkoutQuery({
        skip: intId === -1,
        variables: {
            input: intId,
        }
    });


    let body;
    if (!data?.exercisesInAWorkout) {
        body =
            <Box>No ?.exercisesInAWorkout, add some.</Box>
    }
    if (data?.exercisesInAWorkout) {
        console.log(data?.exercisesInAWorkout)
        body =
            <Box>
                {data?.exercisesInAWorkout.map((exercise) => (
                    <ExerciseCard
                        key={exercise.id}
                        exerciseName={exercise.exerciseName}
                        id={exercise.id}
                        workoutIdentity={exercise.workoutIdentity}
                        weight={exercise.weight}
                        sets={exercise.sets}
                        reps={exercise.reps}
                        time={exercise.time}
                        rpe={exercise.rpe}
                        notes={exercise.notes}
                    />
                ))}
            </Box>
    }

    return (
        <React.Fragment>
            <NavBar />
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                marginTop="5rem"
            >
                {body}
            </Box>
        </React.Fragment>
    );
}
export default withApollo({ ssr: false })(Workout)