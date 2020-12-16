import { Workout } from "../entities/Workout";
import { MyContext } from "src/types";
import { Arg, Ctx, Field, FieldResolver, InputType, Mutation, Query, Resolver, Root } from "type-graphql";
import { getConnection } from "typeorm";
import { Program } from "../entities/Program";

@InputType()
class ProgramInput {
    @Field()
    programName: string;
    @Field()
    programCategory: string;
}

@Resolver(Program)
export class ProgramResolver {

    @Mutation(() => [Program])
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

    @FieldResolver(() => Program)
    creator(@Root() program: Program, @Ctx() { userLoader }: MyContext) {
        return userLoader.load(program.creatorId)
    };


    @Query(() => [Program])
    async myPrograms(
        @Ctx() { req }: MyContext
    ): Promise<Program[]> {
        const programs = await getConnection().query(
            `
           SELECT * FROM public.program WHERE public.program."creatorId" = ${req.session.userId}
            `
        );
        console.log(programs)
        return programs
    };
}