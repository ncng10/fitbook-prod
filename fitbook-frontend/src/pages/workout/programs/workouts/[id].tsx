import { Box, IconButton } from '@chakra-ui/react';
import React from 'react';
import ExerciseCard from '../../../../components/ExerciseCard';
import { NavBar } from '../../../../components/NavBar';
import { useExercisesInAWorkoutQuery, useWorkoutQuery } from '../../../../generated/graphql';
import { useGetIntId } from '../../../../utils/useGetIntId';
import { withApollo } from '../../../../utils/withApollo';
import { RiMenuAddLine } from "react-icons/ri"
import CreateExerciseForm from '../../../../components/CreateExerciseForm';

interface WorkoutProps {

}

const Workout: React.FC<WorkoutProps> = ({ }) => {
    const intId = useGetIntId();
    const { data, loading, error } = useExercisesInAWorkoutQuery({
        skip: intId === -1,
        variables: {
            workoutId: intId
        }
    });

    // const { data: workoutData } = useWorkoutQuery({
    //     variables: {
    //         workoutId: data?.exercisesInAWorkout?.map(x => x.workoutIdentity)[0] //all exercises belong to workout so taking the first item of the array is fine
    //     }
    // })

    let body;
    if (data?.exercisesInAWorkout) {
        console.log(data?.exercisesInAWorkout)
        body =
            <Box>
                <Box
                    width="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    {/* <h3 style={{ fontWeight: 1000, fontSize: 25 }}>
                        {workoutData?.workout.workoutName} ({workoutData?.workout.workoutDate})
                    </h3> */}
                </Box>

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
                marginTop="2rem"
            >
                {body}
                <CreateExerciseForm />
            </Box>
        </React.Fragment>
    );
}
export default withApollo({ ssr: false })(Workout)