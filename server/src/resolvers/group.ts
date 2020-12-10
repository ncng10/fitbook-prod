import { Group } from "../entities/Group";
import { Arg, Ctx, Field, FieldResolver, InputType, Int, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { MyContext } from "../types";
import { User } from '../entities/User'
import { GroupMembers } from "../entities/GroupMembers";
import { getConnection } from "typeorm";



@InputType()
class GroupInput {
    @Field()
    groupName: string;
    @Field()
    groupCategory: string;
}

@InputType()
class JoinGroupInput {
    @Field()
    groupId: number;
}



@Resolver(Group)
export class GroupResolver {

    @Query(() => Group)
    async group(
        @Arg("id", () => Int) id: number
    ): Promise<Group | undefined> {
        return Group.findOne(id)

    }

    @FieldResolver(() => User)
    creator(@Root() group: Group, @Ctx() { userLoader }: MyContext) {
        // console.log("creatorId", group.creatorId)
        // console.log("group", group)
        // console.log("userLoader", userLoader)
        return userLoader.load(group.creatorId)
    };

    @Mutation(() => [GroupMembers])
    async joinGroup(
        @Arg("input") input: JoinGroupInput,
        @Ctx() { req }: MyContext
    ) {
        const joinGroup = await getConnection().query(
            `
            INSERT INTO public.group_members
            ("memberId", "groupId")
            VALUES(${req.session.userId}, ${input.groupId})
            `
        );
        return joinGroup
    }

    @Query(() => [Group])
    async groupMembers(
    ) {
        const members = await getConnection().query(
            `
            SELECT *
            FROM public.group LEFT JOIN public.group_members ON public.group.id = public.group_members."groupId"
            LEFT JOIN public.user ON public.group_members."memberId" = public.user.id
            `
        );
        return members
    }

    @FieldResolver(() => Group)
    members() {

    }

}