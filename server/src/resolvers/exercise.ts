import { Arg, Field, InputType, Int, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { Exercise } from "../entities/Exercise";


@InputType()
class NewExerciseInput {
    @Field()
    workoutIdentity: number;
    @Field()
    exerciseName: string;
    @Field()
    weight: number;
    @Field()
    sets: number;
    @Field()
    reps: number;
    @Field()
    time: number;
    @Field()
    rpe: number;
    @Field()
    notes: string;
}

@Resolver(Exercise)
export class ExerciseResolver {

    @Mutation(() => [Exercise])
    async addExerciseToWorkout(
        @Arg("inputs", () => NewExerciseInput) input: NewExerciseInput
    ) {
        const personalMessage = getConnection().query(
            `
            INSERT INTO public.exercise
            ("workoutIdentity", "exerciseName", "weight", "sets", "reps",
            "time", "rpe", "notes"
            )
            VALUES(
            '${input.workoutIdentity}', '${input.exerciseName}', ${input.weight},
            ${input.sets}, ${input.reps}, ${input.time}, ${input.rpe}, '${input.notes}'
            )
            RETURNING *
            `
        )
        return personalMessage
    }

    @Query(() => [Exercise])
    async exercisesInAWorkout(
        @Arg("input", () => Int) workoutsId: number
    ) {
        const exercisesInAWorkout = getConnection().query(
            `
           SELECT * FROM public.workout
           INNER JOIN public.exercise ON public.exercise."workoutIdentity" = public.workout.id
           WHERE public.exercise."workoutIdentity" = ${workoutsId}
            `
        )
        return exercisesInAWorkout
    }
}