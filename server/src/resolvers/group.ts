import { Group } from "../entities/Group";
import { Arg, Ctx, Field, FieldResolver, InputType, Int, Mutation, Query, Resolver, Root } from "type-graphql";
import { MyContext } from "../types";
import { User } from '../entities/User'




@InputType()
class GroupInput {
    @Field()
    groupName: string;
    @Field()
    groupCategory: string;
}



@Resolver(Group)
export class GroupResolver {

    @Query(() => Group)
    async group(
        @Arg("id", () => Int) id: number
    ): Promise<Group | undefined> {
        return Group.findOne(id)
    }

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

    @FieldResolver(() => User)
    creator(@Root() group: Group, @Ctx() { userLoader }: MyContext) {
        console.log("creatorId", group.creatorId)
        console.log("group", group)
        console.log("userLoader", userLoader)
        return userLoader.load(group.creatorId)
    }

}