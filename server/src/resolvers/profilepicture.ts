import { createWriteStream } from "fs";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { MyContext } from "src/types";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { getConnection } from "typeorm";


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
        if (!upload) {
            return false
        }
        return true
    }
}

