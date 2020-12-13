import { Program } from "../entities/Program";
import { Arg, Ctx, Field, FieldResolver, InputType, Mutation, Resolver, Root } from "type-graphql";
import { MyContext } from "src/types";
import { User } from "../entities/User"
import { getConnection } from "typeorm";

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
    }

}