import { UserFriends } from "../entities/UserFriends";
import { MyContext } from "../types";
import { Arg, Ctx, Field, InputType, Int, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { User } from "../entities/User";

@InputType()
class AddFriendInput {
    @Field()
    userTwoIdentity: number;
    @Field()
    friendshipStatus: number;
}

// friendship codes: [{0: pending}, {1: friends}, {2: rejected}, {3: blocked}]
@Resolver(User)
export class FriendRelationship {
    @Mutation(() => [UserFriends])
    async addFriend(
        @Arg("AddFriendInput") input: AddFriendInput,
        @Ctx() { req }: MyContext
    ) {
        const addFriend = await getConnection().query(
            `
           INSERT INTO public.user_friends
           ("userOneIdentity", "userTwoIdentity","friendshipStatus")
           VALUES(${req.session.userId},${input.userTwoIdentity}, ${input.friendshipStatus})
           RETURNING *
           `
        )
        return addFriend
    };

    @Query(() => [UserFriends])
    async pendingFriends(
        @Ctx() { req }: MyContext
    ) {
        const pendingFriends = await getConnection().query(
            `
            SELECT * FROM public.user_friends
            WHERE user_friends."userOneIdentity"= ${req.session.userId} AND user_friends."friendshipStatus" = 0
            OR 
            user_friends."userTwoIdentity" = ${req.session.userId} AND user_friends."friendshipStatus" = 0
            `
        )
        return pendingFriends
    };

    @Query(() => [UserFriends])
    async myFriends(
        @Ctx() { req }: MyContext
    ) {
        const friendsList = await getConnection().query(
            `
            SELECT * FROM public.user_friends
            WHERE user_friends."userOneIdentity"= ${req.session.userId} AND user_friends."friendshipStatus" = 1
            OR 
            user_friends."userTwoIdentity" = ${req.session.userId} AND user_friends."friendshipStatus" = 1
            `
        )
        return friendsList
    };

    @Mutation(() => Boolean)
    async acceptFriendRequest(
        @Ctx() { req }: MyContext,
        @Arg("userTwoIdentity", () => Int) userTwoIdentity: number,
    ) {
        const acceptFriendRequest = await getConnection().query(
            `
            UPDATE public.user_friends
            SET "friendshipStatus" = 1
            WHERE user_friends."userOneIdentity" = ${req.session.userId} AND user_friends."userTwoIdentity" = ${userTwoIdentity}
            RETURNING *
            `
        )
        if (!acceptFriendRequest) {
            return false
        }
        return true
    }
}