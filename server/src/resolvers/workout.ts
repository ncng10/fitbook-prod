import { ProgramWorkouts } from "../entities/ProgramWorkouts";
import { MyContext } from "src/types";
import { Arg, Ctx, Field, InputType, Int, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { Workout } from "../entities/Workout";


@InputType()
class CreateWorkoutInput {
    @Field()
    workoutName: string;
    @Field()
    workoutCategory: string;
    @Field()
    workoutDate: string;
}

@InputType()
class AddWorkoutToProgramInput {
    @Field()
    workoutId: number;
    @Field()
    programId: number;
}

@Resolver(Workout)
export class WorkoutResolver {

    @Mutation(() => [Workout])
    async createWorkout(
        @Arg("input") input: CreateWorkoutInput,
        @Ctx() { req }: MyContext
    ): Promise<Workout[]> {
        const workoutCreation = await getConnection().query(
            `
            INSERT INTO public.workout
            ("workoutName", "workoutCategory", "workoutDate", "creatorId")
            VALUES ('${input.workoutName}', '${input.workoutCategory}', '${input.workoutDate}',  ${req.session.userId})
            RETURNING *
            `
        )
        return workoutCreation
    }

    @Mutation(() => [ProgramWorkouts])
    async addWorkoutToProgram(
        @Arg("input") input: AddWorkoutToProgramInput
    ) {
        const addWorkout = await getConnection().query(
            `
            INSERT INTO public.program_workouts
            ("workoutId", "programId")
            VALUES(${input.workoutId},${input.programId})
            `
        )
        return addWorkout
    }

    @Query(() => [Workout])
    async workouts(
        @Arg("programId", () => Int) programId: number,
        @Ctx() { req }: MyContext
    ) {
        const workoutsList = await getConnection().query(
            `
            SELECT * FROM public.workout INNER JOIN public.program_workousts ON public.workout.id = public.program_workouts."workoutId"
            AND public.program_workouts."programId" = ${programId} AND public.workout."creatorId" = ${req.session.userId}
            `
        )
        return workoutsList
    }
}