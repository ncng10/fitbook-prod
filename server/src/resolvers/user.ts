import { Arg, Ctx, Field, FieldResolver, Int, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { User } from '../entities/User'
import { UsernamePasswordInput } from "./UsernamePasswordInput";
import { MyContext } from '../types'
import { getConnection } from "typeorm";
import argon2 from 'argon2';
import { validateRegister } from "../utils/validateRegister";

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
    };

    @Mutation(() => UserResponse)
    async register(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() { req }: MyContext
    ): Promise<UserResponse> {
        const errors = validateRegister(options);
        if (errors) {
            return { errors };
        }
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
    };

    @Mutation(() => UserResponse)
    async login(
        @Arg('userNameOrEmail') userNameOrEmail: string,
        @Arg('password') password: string,
        @Ctx() { req }: MyContext
    ): Promise<UserResponse> {
        const user = await User.findOne(
            userNameOrEmail.includes("@")
                ? { where: { email: userNameOrEmail } }
                : { where: { username: userNameOrEmail } }
        );
        if (!user) {
            return {
                errors: [{
                    field: "userNameOrEmail",
                    message: "Username does not exist",
                }],
            };
        }
        const valid = await argon2.verify(user.password, password);
        if (!valid) {
            return {
                errors: [
                    {
                        field: "password",
                        message: "Invalid Login",
                    },
                ],
            };
        }

        req.session.userId = user.id;

        return {
            user
        };
    }
    @Mutation(() => Boolean)
    logout(
        @Ctx() { req, res }: MyContext
    ) {
        //removes session from redis
        //removes cookie
        return new Promise((resolve) => req.session.destroy(err => {
            res.clearCookie("jid");
            if (err) {
                console.log(err);
                resolve(false);
                return
            }
            resolve(true);
        }));
    };


    @Query(() => User)
    memberCheck(
        @Ctx() { req }: MyContext
    ) {
        if (!req.session.userId) {
            return null
        }
        return User.findOne(req.session.userId);
    };

}