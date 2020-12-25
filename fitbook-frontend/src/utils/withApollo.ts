import { ApolloClient, InMemoryCache, split } from '@apollo/client';
import { NextPageContext } from 'next';
import { createWithApollo } from "./createWithApollo";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from '@apollo/client/utilities';
import { createUploadLink } from "apollo-upload-client"
const createClient = (ctx: NextPageContext) =>
    new ApolloClient({
        uri: process.env.NEXT_PUBLIC_API_URL as string,
        credentials: "include",
        headers: {
            cookie:
                (typeof window === "undefined"
                    ? ctx?.req?.headers.cookie
                    : undefined) || "",
        },
        link: splitLink,
        cache: new InMemoryCache({
            //pagination
            typePolicies: {
                Query: {
                    fields: {
                    },
                },
            },
        }),
    });

const wsLink = process.browser ? new WebSocketLink({
    uri: `wss://api.fitbookit.com/graphql`,
    options: {
        reconnect: true,
    }
}) : null;
const httpLink = new createUploadLink({
    uri: process.env.NEXT_PUBLIC_API_URL as string,
    credentials: "include"
});

const splitLink = process.browser ? split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink
) : httpLink;

export const withApollo = createWithApollo(createClient)