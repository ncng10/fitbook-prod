import { isAuth } from "../utils/middleware/isAuth";
import { Arg, Ctx, Field, FieldResolver, InputType, Int, Mutation, PubSub, PubSubEngine, Query, Resolver, Root, Subscription, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";
import { User } from "../entities/User";
import { UserFriends } from "../entities/UserFriends";
import { MyContext } from "../types";

@InputType()
class AddFriendInput {
    @Field()
    userTwoIdentity: number;
    @Field()
    friendshipStatus: number;
}

// friendship codes: [{0: pending}, {1: friends}, {2: rejected}, {3: blocked}]
@Resolver(UserFriends)
export class FriendRelationship {
    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async addFriend(
        @Arg("AddFriendInput") input: AddFriendInput,
        @PubSub() pubSub: PubSubEngine,
        @Ctx() { req }: MyContext
    ) {
        const addFriend = await UserFriends.create({
            friendshipStatus: input.friendshipStatus,
            userOneIdentity: req.session.userId,
            userTwoIdentity: input.userTwoIdentity
        }).save()
        // const requests = await getConnection().query(
        //     `
        //     SELECT * FROM public.user_friends
        //    INNER JOIN public.user ON public.user_friends."userOneIdentity" = public.user.id
        //    WHERE public.user_friends."userTwoIdentity" = ${req.session.userId}
        //    AND public.user_friends."friendshipStatus" = 0
        //     `
        // )
        await pubSub.publish("NEW_FRIEND_REQUEST", addFriend)
        return true
    };

    @Query(() => [User])
    @UseMiddleware(isAuth)
    async pendingFriends(
        @Ctx() { req }: MyContext
    ) {
        const pendingFriends = await getConnection().query(
            `
           SELECT * FROM public.user_friends
           INNER JOIN public.user ON public.user_friends."userOneIdentity" = public.user.id
           WHERE public.user_friends."userTwoIdentity" = ${req.session.userId}
           AND public.user_friends."friendshipStatus" = 0
            `
        )
        return pendingFriends
    };

    @Query(() => [UserFriends])
    @UseMiddleware(isAuth)
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
    @UseMiddleware(isAuth)
    async acceptFriendRequest(
        @Ctx() { req }: MyContext,
        @Arg("userTwoIdentity", () => Int) userTwoIdentity: number,
    ) {
        const acceptFriendRequest = await getConnection().query(
            `
            UPDATE public.user_friends
            SET "friendshipStatus" = 1
            WHERE user_friends."userTwoIdentity" = ${req.session.userId} AND user_friends."userOneIdentity" = ${userTwoIdentity}
            RETURNING *
            `
        )
        if (!acceptFriendRequest) {
            return false
        }
        return true
    };

    @Query(() => [User])
    async friendslist1(
        @Ctx() { req }: MyContext
    ) {
        const friendslist = await getConnection().query(
            `
            SELECT * FROM public.user
            INNER JOIN public.user_friends
            ON public.user.id = public.user_friends."userTwoIdentity"
            AND public.user_friends."userOneIdentity" = ${req.session.userId} 
            UNION 
            SELECT * FROM public.user
            INNER JOIN public.user_friends
            ON public.user.id = public.user_friends."userOneIdentity"
            AND public.user_friends."userTwoIdentity" = ${req.session.userId} 
            `
        )
        return friendslist
    }

    @Subscription(() => UserFriends, {
        topics: "NEW_FRIEND_REQUEST"
    })
    async newFriendRequest(
        @Root() payload: UserFriends
    ) {
        return payload
    };
}