import { MyContext } from "src/types";
import { Arg, Ctx, Field, InputType, Int, Mutation, Query, Resolver, Root, Subscription, PubSub, PubSubEngine } from "type-graphql";
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

    @Mutation(() => [PersonalMessage])
    async sendPersonalMessage(
        @Arg("input") input: PersonalMessageInput,
        @Arg("recipientId", () => Int) recipientId: number,
        @PubSub() pubSub: PubSubEngine,
        @Ctx() { req }: MyContext
    ) {
        const user = await User.findOne(req.session.userId)
        const personalMessage = await getConnection().query(
            `
            INSERT INTO public.personal_message 
            ("recipientId", "senderId", sender, text)
            VALUES ('${recipientId}', '${req.session.userId}', '${user?.username}', '${input.text}')
            RETURNING *
           `
        );
        await pubSub.publish("MESSAGES", personalMessage)
        return personalMessage
    };

    @Query(() => [PersonalMessage])
    async inboxMessages(
        @Ctx() { req }: MyContext
    ) {
        const inbox = await getConnection().query(
            `
            SELECT DISTINCT sender, "senderId" FROM public.personal_message WHERE public.personal_message."recipientId" = ${req.session.userId}
            `
        );
        return inbox
    };

    @Subscription(() => [PersonalMessage], {
        topics: "MESSAGES"
    })
    newMessage(
        @Root() personalMessage: string[]
    ) {
        return personalMessage
    }

}