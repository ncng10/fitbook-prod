import { isAuth } from "../utils/middleware/isAuth";
import { Arg, Ctx, Field, FieldResolver, InputType, Int, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";
import { Group } from "../entities/Group";
import { GroupMembers } from "../entities/GroupMembers";
import { User } from '../entities/User';
import { MyContext } from "../types";



@InputType()
class GroupInput {
    @Field()
    groupName: string;
    @Field()
    groupCategory: string;
};

@InputType()
class JoinGroupInput {
    @Field(() => Int)
    groupId: number;
};



@Resolver(Group)
export class GroupResolver {
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
    };

    @Query(() => Group)
    @UseMiddleware(isAuth)
    async group(
        @Arg("id", () => Int) id: number
    ): Promise<Group | undefined> {
        return Group.findOne(id)
    };

    @Mutation(() => [GroupMembers])
    @UseMiddleware(isAuth)
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
    @UseMiddleware(isAuth)
    async groups(
    ) {
        const groups = await getConnection().query(
            `
            SELECT * FROM public.group
            `
        );
        return groups
    };

    @Query(() => [Group])
    @UseMiddleware(isAuth)
    async isMember(
        @Ctx() { req }: MyContext,
    ) {
        const isMember = await getConnection().query(`
        SELECT * FROM public.group INNER JOIN public.group_members ON public.group.id = public.group_members."groupId" INNER JOIN
        public.user ON public.user.id = public.group_members."memberId" WHERE public.user.id = ${req.session.userId}
        `);
        return isMember
    };


    @FieldResolver(() => User)
    creator(@Root() group: Group, @Ctx() { userLoader }: MyContext) {
        // console.log("creatorId", group.creatorId)
        // console.log("group", group)
        // console.log("userLoader", userLoader)
        return userLoader.load(group.creatorId)
    };

    @FieldResolver(() => [User])
    async members(
        @Arg("groupId", () => Int) groupId: number
    ) {
        const members = await getConnection().query(
            `
            SELECT * FROM public.user INNER JOIN public.group_members ON public.group_members."memberId" = public.user.id AND public.group_members."groupId" = ${groupId}
            `
        )
        return members
    }
}