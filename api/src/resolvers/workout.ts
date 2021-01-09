import { MyContext } from "src/types";
import { isAuth } from "../utils/middleware/isAuth";
import { Arg, Ctx, Field, InputType, Int, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
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
    @Field()
    programIdentity: number;
};

// @InputType()
// class AddWorkoutToProgramInput {
//     @Field()
//     workoutId: number;
//     @Field()
//     programId: number;
// };

@Resolver(Workout)
export class WorkoutResolver {

    @Mutation(() => [Workout])
    @UseMiddleware(isAuth)
    async createWorkout(
        @Arg("input") input: CreateWorkoutInput,
        @Ctx() { req }: MyContext
    ): Promise<Workout[]> {
        const workoutCreation = await getConnection().query(
            `
            INSERT INTO public.workout
            ("workoutName", "workoutCategory", "workoutDate", "creatorId", "programIdentity")
            VALUES ('${input.workoutName}', '${input.workoutCategory}', '${input.workoutDate}',  ${req.session.userId}, ${input.programIdentity})
            RETURNING *
            `
        )
        return workoutCreation
    };

    // @Mutation(() => [ProgramWorkouts])
    // async addWorkoutToProgram(
    //     @Arg("input") input: AddWorkoutToProgramInput
    // ) {
    //     const addWorkout = await getConnection().query(
    //         `
    //         INSERT INTO public.program_workouts
    //         ("workoutId", "programId")
    //         VALUES(${input.workoutId},${input.programId})
    //         `
    //     )
    //     return addWorkout
    // };

    @Query(() => [Workout])
    @UseMiddleware(isAuth)
    async workouts(
        @Arg("programId", () => Int) programId: number,
    ) {
        const workoutsList = await getConnection().query(
            `
            SELECT * FROM public.workout
            WHERE public.workout."programIdentity" = ${programId}
            `
        )
        return workoutsList
    };

    @Query(() => Workout)
    @UseMiddleware(isAuth)
    workout(
        @Arg("workoutId", () => Int) workoutId: number,
    ): Promise<Workout | undefined> {
        return Workout.findOne(workoutId)
    };
}