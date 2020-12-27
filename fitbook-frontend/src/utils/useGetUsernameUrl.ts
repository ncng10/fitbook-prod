import { useRouter } from "next/router";

export const useGetUsernameUrl = () => {
    const router = useRouter();
    const userName =
        typeof router.query.username === "string" ? router.query.username : ""

    return userName as string;
};