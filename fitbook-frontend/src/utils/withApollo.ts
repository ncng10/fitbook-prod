import { ApolloClient, InMemoryCache } from '@apollo/client';
import { NextPageContext } from 'next';
import { createWithApollo } from "./createWithApollo"

const createClient = (ctx: NextPageContext) =>
    new ApolloClient({
        uri: "http://localhost:5001/graphql" as string,
        credentials: "include",
        headers: {
            cookie:
                (typeof window === "undefined"
                    ? ctx?.req?.headers.cookie
                    : undefined) || "",
        },
        cache: new InMemoryCache({
            //pagination
            typePolicies: {
                Query: {
                    fields: {
                    },
                },
            },
        }),
    })


export const withApollo = createWithApollo(createClient)