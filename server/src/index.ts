import "reflect-metadata";
import path from 'path';
import { createConnection } from 'typeorm'
import { User } from './entities/User';
import express from 'express'
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/user';
import session from 'express-session';
import connectRedis from 'connect-redis';
import Redis from 'ioredis';
import cors from 'cors';
import { Group } from "./entities/Group";
import { GroupResolver } from "./resolvers/group";
require("dotenv").config();
const main = async () => {
    const connection = await createConnection({
        type: "postgres",
        password: process.env.DB_PASSWORD,
        url: process.env.DATABASE_URL,
        logging: true,
        synchronize: true,
        migrations: [path.join(__dirname, "./migrations/*")],
        entities: [User, Group]
    });


    const app = express();


    const RedisStore = connectRedis(session)
    const redis = new Redis(process.env.REDIS_URL);
    app.set("trust proxy", 1);
    app.use(cors(
        {
            credentials: true,
            origin: process.env.NODE_ENV === "production" ? "https://ncong.app" : "http://localhost:3000"
        }
    ));


    app.use(
        session({
            name: "jid",
            store: new RedisStore({
                client: redis,
                disableTouch: true,
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years
                httpOnly: true,
                sameSite: 'lax', //csrf protection
                // secure: __prod__,  //cookie only works in https
                // domain: __prod__ ? ".ncong.app" : undefined,
            },
            saveUninitialized: false,
            secret: 'asdasfgajnav',
            resave: false,
        })
    );

    app.listen(5001, () => {
        console.log('server started on port 5001')
    });

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver, GroupResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res })
    });
    apolloServer.applyMiddleware({ app, cors: { origin: false } });


};


main().catch((err) => {
    console.log(err)
});

