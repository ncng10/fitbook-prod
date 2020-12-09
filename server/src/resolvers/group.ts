import { Group } from "../entities/Group";
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import { MyContext } from "src/types";




@InputType()
class GroupInput {
    @Field()
    groupName: string;
    @Field()
    groupCategory: string;
}



@Resolver(Group)
export class GroupResolver {
    @Mutation(() => Group)
    async createGroup(
        @Arg("input") input: GroupInput,
        @Ctx() { req }: MyContext
    ): Promise<Group> {
        return Group.create({
            ...input,
            creatorId: req.session.userId,
        }).save();
    }

}