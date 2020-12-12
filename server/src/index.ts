import "reflect-metadata";
import path from 'path';
import { createConnection } from 'typeorm'
import { User } from './entities/User';
import express from 'express'
import { ApolloServer, PubSub } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/user';
import session from 'express-session';
import connectRedis from 'connect-redis';
import Redis from 'ioredis';
import cors from 'cors';
import { Group } from "./entities/Group";
import { GroupResolver } from "./resolvers/group";
import { createUserLoader } from "./utils/createUserLoader";
import { GroupMembers } from "./entities/GroupMembers";
import { PersonalMessage } from "./entities/PersonalMessage";
import { PersonalMessageResolver } from "./resolvers/personalmessage";
import { RedisPubSub } from "graphql-redis-subscriptions";
import http from "http"

const PORT = 5001
require("dotenv").config();
const main = async () => {
    const connection = await createConnection({
        type: "postgres",
        password: process.env.DB_PASSWORD,
        url: process.env.DATABASE_URL,
        logging: true,
        synchronize: true,
        migrations: [path.join(__dirname, "./migrations/*")],
        entities: [User, Group, GroupMembers, PersonalMessage]
    });

    const options: Redis.RedisOptions = {
        host: '192.168.1.8',
        port: 6379,
        retryStrategy: times => Math.max(times * 100, 3000),
    };
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
    const pubsub = new PubSub();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver, GroupResolver, PersonalMessageResolver],
            validate: false,
            pubSub: new RedisPubSub({
                publisher: new Redis(),
                subscriber: new Redis(),
            })
        }),
        context: ({ req, res }) => ({ req, res, redis, userLoader: createUserLoader(), pubsub }),
        subscriptions: {
        }
    });
    apolloServer.applyMiddleware({ app, cors: { origin: false } });
    const httpServer = http.createServer(app)
    apolloServer.installSubscriptionHandlers(httpServer)

    httpServer.listen(PORT, () => {
        console.log(`server started on port ${PORT}${apolloServer.graphqlPath}`)
        console.log(`Subs started at ${PORT}${apolloServer.subscriptionsPath}`)
    });

};


main().catch((err) => {
    console.log(err)
});

