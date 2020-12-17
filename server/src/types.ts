import { Request, Response } from 'express';
import { SessionData } from "express-session";
import { Session } from "inspector";
import { Redis } from "ioredis";
import { createUserLoader } from './utils/createUserLoader';
import { Stream } from "stream";

export type MyContext = {
    req: Request & { session: Session & Partial<SessionData> & { userId?: number } };
    res: Response;
    redis: Redis;
    userLoader: ReturnType<typeof createUserLoader>;
}


export interface Upload {
    filename: string;
    mimetype: string;
    encoding: string;
    createReadStream: () => Stream;
}