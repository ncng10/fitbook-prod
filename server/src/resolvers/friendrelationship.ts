import { UserFriends } from "../entities/UserFriends";
import { MyContext } from "../types";
import { Arg, Ctx, Field, InputType, Int, Mutation, PubSub, PubSubEngine, Query, Resolver, Root, Subscription } from "type-graphql";
import { getConnection } from "typeorm";
import { User } from "../entities/User";
import { ConnectionContext } from "subscriptions-transport-ws";
import { ExpressContext } from "apollo-server-express/dist/ApolloServer";

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
    @Mutation(() => Boolean)
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
        const requests = await getConnection().query(
            `
            SELECT * FROM public.user_friends
            WHERE user_friends."friendshipStatus" = 0
            AND user_friends."userOneIdentity" = ${req.session.userId}
            `
        )
        await pubSub.publish("NEW_FRIEND_REQUEST", requests)
        return true
    };

    @Query(() => [User])
    async pendingFriends(
        @Ctx() { req }: MyContext
    ) {
        const pendingFriends = await getConnection().query(
            `
           SELECT * FROM public.user_friends
           INNER JOIN public.user ON public.user_friends."userOneIdentity" = public.user.id
           WHERE public.user_friends."userTwoIdentity" = ${req.session.userId}
            `
        )
        console.log(pendingFriends)
        return pendingFriends
    };

    @Query(() => UserFriends)
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
    };


    @Subscription(() => [UserFriends], {
        topics: "NEW_FRIEND_REQUEST"
    })
    async newFriendRequest(
        @Root() payload: UserFriends[]
    ) {
        return payload
    };
}