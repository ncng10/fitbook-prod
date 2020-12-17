import { Resolver, Mutation, Arg } from "type-graphql";
import { GraphQLUpload, FileUpload } from "graphql-upload";
import { createWriteStream } from "fs";
import { getConnection } from "typeorm";
import { User } from "../entities/User";


@Resolver()
export class ProfilePictureResolver {
    @Mutation(() => Boolean)
    async addProfilePicture(@Arg("file", () => GraphQLUpload)
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
            WHERE public.user.id = 25
            RETURNING *
        `)
        console.log("upload", upload)
        if (!upload) {
            return false
        }
        return true
    }
}

