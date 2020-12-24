import { MyContext } from "src/types";
import { isAuth } from "../utils/middleware/isAuth";
import { Arg, Ctx, Field, FieldResolver, InputType, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";
import { Program } from "../entities/Program";

@InputType()
class ProgramInput {
    @Field()
    programName: string;
    @Field()
    programCategory: string;
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
}