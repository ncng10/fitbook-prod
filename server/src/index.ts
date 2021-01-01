import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import "dotenv-safe/config";
import express from 'express';
import session from 'express-session';
import { GraphQLError } from 'graphql';
import { RedisPubSub } from "graphql-redis-subscriptions";
import { graphqlUploadExpress } from 'graphql-upload';
import http from "http";
import Redis from 'ioredis';
import path from 'path';
import "reflect-metadata";
import { buildSchema } from 'type-graphql';
import { createConnection, getConnection } from 'typeorm';
import { v4 } from "uuid";
import { __prod__ } from './constants';
import { DashboardFeed } from './entities/DashboardFeed';
import { Exercise } from './entities/Exercise';
import { Group } from "./entities/Group";
import { GroupMembers } from "./entities/GroupMembers";
import { PersonalMessage } from "./entities/PersonalMessage";
import { Program } from "./entities/Program";
import { ProgramWorkouts } from './entities/ProgramWorkouts';
import { SharedProgram } from './entities/SharedProgram';
import { User } from './entities/User';
import { UserFriends } from './entities/UserFriends';
import { Workout } from './entities/Workout';
import { DashboardFeedResolver } from './resolvers/dashboardfeed';
import { ExerciseResolver } from './resolvers/exercise';
import { FriendRelationship } from './resolvers/friendrelationship';
import { GroupResolver } from "./resolvers/group";
import { PersonalMessageResolver } from "./resolvers/personalmessage";
import { ProfilePictureResolver } from './resolvers/profilepicture';
import { ProgramResolver } from "./resolvers/program";
import { UserResolver } from './resolvers/user';
import { WorkoutResolver } from './resolvers/workout';
import { createUserLoader } from "./utils/createUserLoader";

const PORT = 5001
require("dotenv").config();
const main = async () => {
    const connection = await createConnection({
        type: "postgres",
        url: process.env.DATABASE_URL,
        logging: true,
        synchronize: true,
        migrations: [path.join(__dirname, "./migrations/*")],
        entities: [User, Group, GroupMembers, PersonalMessage, Program, Workout, Exercise, ProgramWorkouts, UserFriends, SharedProgram, DashboardFeed]
    });
    // connection.runMigrations();
    const app = express();

    const RedisStore = connectRedis(session);
    const redis = new Redis(process.env.REDIS_URL);
    const options: Redis.RedisOptions = {
        host: '192.168.1.8',
        port: 6379,
        retryStrategy: times => Math.max(times * 100, 3000),
    };

    app.set("trust proxy", 1);

    app.use(cors(
        {
            credentials: true,
            origin: __prod__ ? "https://fitbookit.com" : "http://localhost:3000"
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
                secure: __prod__,  //cookie only works in https
                domain: __prod__ ? ".fitbookit.com" : undefined,
            },
            saveUninitialized: false,
            secret: process.env.REDIS_SECRET,
            resave: false,
        })
    );

    const pubsub = new RedisPubSub(process.env.NODE_ENV === "production"
        ? {
            connection: process.env.REDIS_URL as any
        }
        : {});

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers:
                [
                    UserResolver,
                    GroupResolver,
                    PersonalMessageResolver,
                    ProgramResolver,
                    WorkoutResolver,
                    ProfilePictureResolver,
                    ExerciseResolver,
                    FriendRelationship,
                    DashboardFeedResolver
                ],
            validate: false,
            pubSub: pubsub,
        }),
        uploads: false,
        context: ({ req, res, connection }) => ({ req, res, connection, redis, userLoader: createUserLoader(), pubsub }),
        formatError: (error: GraphQLError) => {
            const errorId = v4();
            console.log("Error ID:", errorId)
            console.log(error)

            return new GraphQLError(`Internal Error: ${errorId}`)
        },
    });

    app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
    app.use("/images", express.static(path.join(__dirname, "../../images")));
    apolloServer.applyMiddleware({ app, cors: { origin: false } });
    const httpServer = http.createServer(app)
    apolloServer.installSubscriptionHandlers(httpServer)

    httpServer.listen(parseInt(process.env.PORT), () => {
        console.log(`server started on port ${PORT}${apolloServer.graphqlPath}`)
        console.log(`Subs started at ${PORT}${apolloServer.subscriptionsPath}`)
    });




};

main().catch((err) => {
    console.log(err)
});

