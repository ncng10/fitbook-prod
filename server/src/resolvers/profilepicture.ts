import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { GraphQLUpload, FileUpload } from "graphql-upload";
import { createWriteStream } from "fs";
import { getConnection } from "typeorm";
import { User } from "../entities/User";
import { MyContext } from "src/types";


@Resolver()
export class ProfilePictureResolver {
    @Mutation(() => Boolean)
    async addProfilePicture(
        @Ctx() { req }: MyContext,
        @Arg("file", () => GraphQLUpload)
        {
            createReadStream,
            filename,
        }: FileUpload) {
        await new Promise(async (resolve, reject) =>
            createReadStream()
                .pipe(createWriteStream(`${__dirname}/../../../images/${filename}`, { autoClose: true }))
                .on("finish", () => resolve(true))
                .on("error", () => reject(false))
        );
        const upload = await getConnection().query(`
            UPDATE public.user
            SET "profilePicture" = '${filename}'
            WHERE public.user.id = ${req.session.userId}
            RETURNING *
        `)
        console.log("upload", createReadStream)
        if (!upload) {
            return false
        }
        return true
    }
}

