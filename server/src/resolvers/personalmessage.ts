import { MyContext } from "../types";
import { isAuth } from "../utils/middleware/isAuth";
import { Arg, Ctx, Field, InputType, Int, Mutation, Query, Resolver, Root, Subscription, PubSub, PubSubEngine, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";
import { PersonalMessage } from "../entities/PersonalMessage";
import { User } from "../entities/User";
@InputType()
class PersonalMessageInput {
    @Field()
    text: string
};

@Resolver(PersonalMessage)
export class PersonalMessageResolver {

    @Query(() => [PersonalMessage])
    @UseMiddleware(isAuth)
    async viewPersonalMessages(
        @Ctx() { req }: MyContext,
        @Arg("senderId", () => Int) senderId: number
    ) {
        const messages = await getConnection().query(
            `
            SELECT * FROM public.personal_message WHERE public.personal_message."senderId" = ${req.session.userId} AND public.personal_message."recipientId" = ${senderId}
            UNION
            SELECT * FROM public.personal_message WHERE public.personal_message."recipientId" = ${req.session.userId} AND public.personal_message."senderId" = ${senderId}
            ORDER BY "createdAt" ASC
            `
        );
        return messages
    };

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async sendPersonalMessage(
        @Arg("input") input: PersonalMessageInput,
        @Arg("recipientId", () => Int) recipientId: number,
        @PubSub() pubSub: PubSubEngine,
        @Ctx() { req }: MyContext
    ) {
        const user = await User.findOne(req.session.userId);
        const otherUser = await User.findOne(recipientId)
        const personalMessage = await PersonalMessage.create({
            text: input.text,
            recipientId: recipientId,
            senderId: req.session.userId,
            sender: user?.username,
            recipient: otherUser?.username
        }).save()
        await pubSub.publish("MESSAGES", personalMessage)
        return true
    };

    @Query(() => [PersonalMessage])
    @UseMiddleware(isAuth)
    async inboxMessages(
        @Ctx() { req }: MyContext
    ) {
        const inbox = await getConnection().query(
            `
            SELECT DISTINCT sender, "senderId", "recipientId",recipient FROM public.personal_message WHERE public.personal_message."recipientId" = ${req.session.userId} 
            UNION
            SELECT DISTINCT sender, "senderId", "recipientId",recipient FROM public.personal_message WHERE public.personal_message."senderId" = ${req.session.userId} 
            AND public.personal_message."recipientId" !=${req.session.userId}
            `
        );
        console.log(inbox)
        return inbox
    };

    @Subscription(() => PersonalMessage, {
        topics: "MESSAGES"
    })
    newMessage(
        @Root() personalMessage: PersonalMessage
    ) {

        return {
            sender: personalMessage.sender,
            text: personalMessage.text,
            senderId: personalMessage.senderId,
            recipientId: personalMessage.recipientId,
            recipient: personalMessage.recipient
        }
    };

}