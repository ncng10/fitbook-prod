import { MyContext } from "../types";
import { isAuth } from "../utils/middleware/isAuth";
import { Arg, Ctx, Field, FieldResolver, InputType, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";
import { Program } from "../entities/Program";
import { User } from "../entities/User";

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
            `
        );
        return programs
    };

    @FieldResolver(() => Program)
    creator(@Root() program: Program, @Ctx() { userLoader }: MyContext) {
        return userLoader.load(program.creatorId)
    };

    @Mutation(() => Boolean)
    async shareProgram(
        @Arg("input") input: ShareProgramInput,
        @Ctx() { req }: MyContext
    ) {
        await getConnection().query(
            `
            UPDATE public.program
            SET "isShared" = true 
            WHERE public.program.id = ${input.programId};
            INSERT INTO public.shared_program 
            ("sharedById", "sharedToId", "programId")
            VALUES(${req.session.userId}, ${input.sharedToId},${input.programId})
            RETURNING *
            `
        )
        return true
    };

    @FieldResolver(() => [User])
    async sharedWith() {
        const sharedWith = await getConnection().query(
            `
            SELECT * FROM public.shared_program
            INNER JOIN public.program
            ON
            public.program.id = public.shared_program."programId"
            INNER JOIN public.user
            ON
            public.user.id = public.shared_program."sharedToId"
            `
        )
        return sharedWith
    }
}