import { Group } from "../entities/Group";
import { Arg, Ctx, Field, FieldResolver, InputType, Int, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { MyContext } from "../types";
import { User } from '../entities/User'
import { isAuth } from "../utils/middleware/isAuth";
import { getConnection } from "typeorm";




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
    @UseMiddleware(isAuth)
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
    };

    @Query(() => [Group])
    @UseMiddleware(isAuth)
    groups() {
        return Group.find()
    }



}