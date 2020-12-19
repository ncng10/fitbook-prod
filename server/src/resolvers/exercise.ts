
import { Exercise } from "../entities/Exercise";
import { ProgramWorkouts } from "../entities/ProgramWorkouts";
import { MyContext } from "src/types";
import { Arg, Args, Ctx, Field, InputType, Int, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";


@InputType()
class NewExerciseInput {
    @Field()
    workoutId: number;
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
    async addExerciseToProgram(
        @Arg("inputs", () => NewExerciseInput) input: NewExerciseInput
    ) {
        const personalMessage = getConnection().query(
            `
            INSERT INTO public.exercise
            ("workoutId", "exerciseName", "weight", "sets", "reps",
            "time", "rpe", "notes"
            )
            VALUES(
            '${input.workoutId}', '${input.exerciseName}', ${input.weight},
            ${input.sets}, ${input.reps}, ${input.time}, ${input.rpe}, '${input.notes}'
            )
            RETURNING *
            `
        )
        return personalMessage
    }
}