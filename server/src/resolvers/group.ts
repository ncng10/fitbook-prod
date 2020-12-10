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
};

@InputType()
class JoinGroupInput {
    @Field()
    groupId: number;
};



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

    @Query(() => Group)
    async group(
        @Arg("id", () => Int) id: number
    ): Promise<Group | undefined> {
        return Group.findOne(id)
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
    };

    @Query(() => [Group])
    async groups(
    ) {
        const groups = await getConnection().query(
            `
            SELECT *
            FROM public.group LEFT JOIN public.group_members ON public.group.id = public.group_members."groupId"
            LEFT JOIN public.user ON public.group_members."memberId" = public.user.id
            `
        );
        return groups
    };

    @FieldResolver(() => [User])
    members(
        @Arg("input") input: number
    ) {
        const members = getConnection().query(
            `
            SELECT DISTINCT username, email,public.user.id FROM public.user INNER JOIN public.group_members ON public.user.id = public.group_members."memberId"
            LEFT JOIN public.group ON public.group_members."groupId" = public.group.id WHERE public.group.id =${input}
            `
        )
        return members
    };


    @FieldResolver(() => User)
    creator(@Root() group: Group, @Ctx() { userLoader }: MyContext) {
        // console.log("creatorId", group.creatorId)
        // console.log("group", group)
        // console.log("userLoader", userLoader)
        return userLoader.load(group.creatorId)
    };


}