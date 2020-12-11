import { PersonalMessage } from "../entities/PersonalMessage";
import { User } from "../entities/User";
import { MyContext } from "src/types";
import { Arg, Ctx, Field, InputType, Int, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";

@InputType()
class PersonalMessageInput {
    @Field()
    text: string;
};

@Resolver(PersonalMessage)
export class PersonalMessageResolver {
    @Mutation(() => [PersonalMessage])
    async sendPersonalMessage(
        @Arg("input") input: PersonalMessageInput,
        @Arg("recipientId", () => Int) recipientId: number,
        @Ctx() { req }: MyContext
    ) {
        const user = await User.findOne(req.session.userId)
        const personalMessage = await getConnection().query(
            `
            INSERT INTO public.personal_message 
            ("recipientId", "senderId", sender, text)
            VALUES ('${recipientId}', '${req.session.userId}', '${user?.username}', '${input.text}')
           `
        );
        return personalMessage
    }

    @Query(() => [PersonalMessage])
    async viewPersonalMessages(
        @Ctx() { req }: MyContext
    ) {
        const messages = await getConnection().query(
            `
            SELECT * FROM public.personal_message WHERE public.personal_message."recipientId" = ${req.session.userId}
            `
        );
        console.log(messages)
    }
}