import { createWriteStream } from "fs";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { MyContext } from "../types";
import { isAuth } from "../utils/middleware/isAuth";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";
import { Storage } from "@google-cloud/storage"
import path from "path";


const gc = new Storage({
    keyFilename: path.join(__dirname, '../../alien-climber-299619-f34fc9524d0e.json'),
    projectId: 'alien-climber-299619'
});
const fitbookBucket = gc.bucket('fitbook-production')


@Resolver()
export class ProfilePictureResolver {
    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async addProfilePicture(
        @Ctx() { req }: MyContext,
        @Arg("file", () => GraphQLUpload)
        {
            createReadStream,
            filename,
        }: FileUpload) {
        await new Promise(async (resolve, reject) =>
            createReadStream()
                .pipe(
                    fitbookBucket.file(filename).createWriteStream({
                        resumable: false,
                        gzip: true
                    })
                )
                .on("finish", () => resolve(true))
                .on("error", () => reject(false))
        );
        const upload = await getConnection().query(`
            UPDATE public.user
            SET "profilePicture" = '${filename}'
            WHERE public.user.id = ${req.session.userId}
            RETURNING *
        `)
        console.log(upload)
        if (!upload) {
            return false
        }
        return true
    };

}

