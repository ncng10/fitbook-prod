import { isAuth } from "../utils/middleware/isAuth";
import { Arg, Field, InputType, Int, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";
import { Exercise } from "../entities/Exercise";


@InputType()
class NewExerciseInput {
    @Field()
    workoutIdentity: number;
    @Field()
    exerciseName: string;
    @Field()
    weight: string;
    @Field()
    sets: string;
    @Field()
    reps: string;
    @Field()
    time: string;
    @Field()
    rpe: string;
    @Field()
    notes: string;
}

@Resolver(Exercise)
export class ExerciseResolver {

    @Mutation(() => [Exercise])
    @UseMiddleware(isAuth)
    async addExerciseToWorkout(
        @Arg("input", () => NewExerciseInput) input: NewExerciseInput
    ) {
        const personalMessage = getConnection().query(
            `
            INSERT INTO public.exercise
            ("workoutIdentity", "exerciseName", "weight", "sets", "reps",
            "time", "rpe", "notes"
            )
            VALUES(
            ${input.workoutIdentity}, '${input.exerciseName}', '${input.weight}',
           ' ${input.sets}', '${input.reps}', '${input.time}', '${input.rpe}', '${input.notes}'
            )
            RETURNING *
            `
        )
        return personalMessage
    }

    @Query(() => [Exercise])
    @UseMiddleware(isAuth)
    async exercisesInAWorkout(
        @Arg("workoutId", () => Int) workoutId: number
    ) {
        const exercisesInAWorkout = getConnection().query(
            `
            SELECT * FROM public.exercise 
            WHERE public.exercise."workoutIdentity" = ${workoutId}
            `
        )
        return exercisesInAWorkout
    }
}