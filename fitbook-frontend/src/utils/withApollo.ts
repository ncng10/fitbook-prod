import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { NextPageContext } from 'next';
import { createWithApollo } from "./createWithApollo";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from '@apollo/client/utilities';
import { createUploadLink } from "apollo-upload-client"
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
    uri: `ws://localhost:5001/graphql`,
    options: {
        reconnect: true,
    }
}) : null;
const httpLink = new createUploadLink({
    uri: 'http://localhost:5001/graphql',
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