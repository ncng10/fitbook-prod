import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { User } from '../entities/User'
import { UsernamePasswordInput } from "./UsernamePasswordInput";
import { MyContext } from '../types'
import { getConnection } from "typeorm";
import { v4 } from 'uuid';
import argon2 from 'argon2';

@ObjectType()
class FieldError {
    @Field()
    field: string;
    @Field()
    message: string;
}

//user returned if it works properly, or an error to be return if it fails
@ObjectType()
class UserResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[]

    @Field(() => User, { nullable: true })
    user?: User
}


@Resolver(User)
export class UserResolver {
    @Query(() => String)
    hello() {
        return "Hello so.o"
    };

    @Query(() => User)
    me(
        @Ctx() { req }: MyContext
    ) {
        if (!req.session.userId) {
            return null
        }
        return User.findOne(req.session.userId);
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() { req }: MyContext
    ) {
        const hashedPassword = await argon2.hash(options.password)
        let user;
        try {
            const result = await getConnection()
                .createQueryBuilder()
                .insert()
                .into(User)
                .values(
                    {
                        username: options.username,
                        email: options.email,
                        password: hashedPassword,
                    }
                )
                .returning("*")
                .execute();
            user = result.raw[0]
        } catch (err) {
            if (err.code === '23505' || err.detail.includes("already exists")) {
                //duplicate username errors
                return {
                    errors: [{
                        field: 'username',
                        message: 'username has already been taken',
                    }],
                }
            }
            console.log('message:', err.message)
        }
        //log user in when registering 
        //store user id session
        //set cookie on user
        req.session.userId = user.id;
        return { user };
    }
}