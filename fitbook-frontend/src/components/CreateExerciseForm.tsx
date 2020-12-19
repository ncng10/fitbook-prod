import { Box } from '@chakra-ui/react'
import { Button } from '@material-ui/core'
import { Form, Formik } from 'formik'
import React from 'react'
import { useAddExerciseToProgramMutation } from '../generated/graphql'
import { InputField } from './InputField'

interface CreateExerciseFormProps {

}

const CreateExerciseForm: React.FC<CreateExerciseFormProps> = ({ }) => {

    const [addExercise] = useAddExerciseToProgramMutation();

    return (
        <React.Fragment>
            <Box>
                <Formik
                    initialValues={{
                        exerciseName: "",
                        weight: 0,
                        reps: 0,
                        sets: 0,
                        time: 0,
                        rpe: 0,
                        notes: "",

                    }}
                    onSubmit={async (values) => {
                        console.log(values)
                    }}
                >
                    <Form>
                        <InputField
                            name="exerciseName"
                            label="Exercise Name"
                            placeholder="Exercise Name"
                        />
                        <InputField
                            name="weight"
                            label="Weight"
                            placeholder="Weight"
                        />
                        <InputField
                            name="reps"
                            label="Reps"
                            placeholder="Reps"
                        />
                        <InputField
                            name="sets"
                            label="Sets"
                            placeholder="Sets"
                        />
                        <Button>Add Exercise</Button>
                    </Form>
                </Formik>
            </Box>
        </React.Fragment>
    );
}
export default CreateExerciseForm