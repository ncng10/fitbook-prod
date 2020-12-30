import { MyContext } from "../types";
import { isAuth } from "../utils/middleware/isAuth";
import { Arg, Ctx, Field, FieldResolver, InputType, Int, Mutation, PubSub, PubSubEngine, Query, Resolver, Root, Subscription, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";
import { Program } from "../entities/Program";
import { User } from "../entities/User";
import { Workout } from "../entities/Workout";
import { SharedProgram } from "../entities/SharedProgram";

@InputType()
class ProgramInput {
    @Field()
    programName: string;
    @Field()
    programCategory: string;
};

@InputType()
class ShareProgramInput {
    @Field()
    sharedToId: number;
    @Field()
    programId: number;
};
@Resolver(Program)
export class ProgramResolver {

    @Mutation(() => [Program])
    @UseMiddleware(isAuth)
    async createProgram(
        @Arg("input") input: ProgramInput,
        @Ctx() { req }: MyContext
    ): Promise<Program[]> {
        const createProgram = await getConnection().query(
            `
           INSERT INTO public.program 
           ("programName", "programCategory", "creatorId")
           VALUES('${input.programName}', '${input.programCategory}', '${req.session.userId}')
           RETURNING *
           `
        )
        return createProgram
    };

    @Query(() => [Program])
    @UseMiddleware(isAuth)
    async myPrograms(
        @Ctx() { req }: MyContext
    ): Promise<Program[]> {
        const programs = await getConnection().query(
            `
           SELECT * FROM public.program WHERE public.program."creatorId" = ${req.session.userId}
           ORDER BY public.program."createdAt" DESC
            `
        );
        return programs
    };

    @Query(() => Program)
    async program(
        @Arg("input", () => Int) programId: number
    ) {
        const program = await Program.findOne(programId)
        return program
    }

    @FieldResolver(() => Program)
    creator(@Root() program: Program, @Ctx() { userLoader }: MyContext) {
        return userLoader.load(program.creatorId)
    };

    @Mutation(() => Boolean)
    async shareProgram(
        @Arg("input") input: ShareProgramInput,
        @Ctx() { req }: MyContext,
        @PubSub() pubSub: PubSubEngine,
    ) {
        await getConnection().query(
            `
            UPDATE public.program
            SET "isShared" = true 
            WHERE public.program.id = ${input.programId};
            `
        )
        const shareProgram = await SharedProgram.create({
            sharedById: req.session.userId,
            sharedToId: input.sharedToId,
            programId: input.programId
        }).save()
        pubSub.publish("NEW_SHARED_PROGRAM", shareProgram)
        return true
    };


    //only use for an individual program, not a full list of them
    @FieldResolver(() => [User])
    async sharedWith(
        @Arg("input", () => Int) programId: number,
    ) {
        const sharedWith = await getConnection().query(
            `   
            SELECT DISTINCT public.shared_program."sharedToId",public.shared_program."sharedById", public.user.id,public.user."profilePicture", public.user.username, public.user.email, public.shared_program."programId"
            FROM public.shared_program
            INNER JOIN  public.user
            ON
            public.user.id = public.shared_program."sharedToId"
            WHERE
            public.shared_program."programId" = ${programId}
            `
        )
        return sharedWith
    };

    @Query(() => [Program])
    async programsSharedWithMe(
        @Ctx() { req }: MyContext
    ) {
        const programsSharedWithMe = await getConnection().query(
            `
            SELECT * FROM public.shared_program 
            INNER JOIN public.program
            ON
            public.program.id = public.shared_program."programId"
            WHERE
            public.shared_program."sharedToId" = ${req.session.userId}
            `
        )
        return programsSharedWithMe
    }

    //individual program shared with me
    @Query(() => [Program])
    async programSharedWithMe(
        @Ctx() { req }: MyContext,
        @Arg("input", () => Int) programId: number
    ) {
        const programSharedWithMe = await getConnection().query(
            `
            SELECT * FROM public.shared_program 
            INNER JOIN public.program
            ON
            public.program.id = public.shared_program."programId"
            WHERE
            public.shared_program."sharedToId" = ${req.session.userId}
            AND public.program.id = ${programId}
            `
        )
        return programSharedWithMe
    };

    @Subscription(() => SharedProgram, {
        topics: "NEW_SHARED_PROGRAM"
    }
    )
    async newSharedProgram(
        @Root() payload: SharedProgram
    ) {
        return payload
    }

    @FieldResolver(() => [Workout])
    async workoutsInAProgram(
        @Arg("input", () => Int) programId: number
    ) {
        const workouts = await getConnection().query(
            `
            SELECT * FROM public.program
            INNER JOIN public.workout
            ON
            PUBLIC.program.id = public.workout."programIdentity"
            WHERE public.program.id = ${programId}
            `
        )
        return workouts
    }
}