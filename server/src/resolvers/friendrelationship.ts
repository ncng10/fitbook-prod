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


    //used for checking if the users are friends during a user search or when on the 
    //profile of a friend. not used for listing friends in a list.
    @Query(() => [UserFriends])
    @UseMiddleware(isAuth)
    async myFriends(
        @Ctx() { req }: MyContext,
        @Arg("input", () => Int) otherUserId: number
    ) {
        const friendsList = await getConnection().query(
            `
            SELECT * FROM public.user_friends
            WHERE public.user_friends."userOneIdentity" = ${req.session.userId} AND public.user_friends."userTwoIdentity" = ${otherUserId}
            OR 
            public.user_friends."userTwoIdentity" = ${req.session.userId} AND public.user_friends."userOneIdentity" = ${otherUserId}
            `
        )
        return friendsList
    };

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async acceptFriendRequest(
        @Ctx() { req }: MyContext,
        @Arg("userOneIdentity", () => Int) userOneIdentity: number,
    ) {
        const acceptFriendRequest = await getConnection().query(
            `
            UPDATE public.user_friends
            SET "friendshipStatus" = 1
            WHERE user_friends."userTwoIdentity" = ${req.session.userId} AND user_friends."userOneIdentity" = ${userOneIdentity}
            RETURNING *
            `
        )
        if (!acceptFriendRequest) {
            return false
        }
        return true
    };


    //used for listing all of a user's friends.
    @Query(() => [User])
    async friendsList(
        @Ctx() { req }: MyContext
    ) {
        const friendslist = await getConnection().query(
            `
            SELECT * FROM public.user
            INNER JOIN public.user_friends
            ON public.user.id = public.user_friends."userTwoIdentity"
            AND public.user_friends."userOneIdentity" = ${req.session.userId}
            AND public.user_friends."friendshipStatus" = 1
            UNION
            SELECT * FROM public.user
            INNER JOIN public.user_friends
            ON public.user.id = public.user_friends."userOneIdentity"
            AND public.user_friends."userTwoIdentity" = ${req.session.userId} 
            AND public.user_friends."friendshipStatus" = 1
            `
        );
        return friendslist
    };

    @Subscription(() => UserFriends, {
        topics: "NEW_FRIEND_REQUEST"
    })
    async newFriendRequest(
        @Root() payload: UserFriends
    ) {
        return payload
    };
}