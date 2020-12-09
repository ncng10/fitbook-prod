import React from 'react'
import { useMeQuery } from '../generated/graphql';
import NextLink from "next/link"
import { Box } from '@chakra-ui/react';
interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({ }) => {
    const { data } = useMeQuery();
    let body = null;
    if (!data) {
        body =
            <Box>
                <NextLink href="/login">
                    Login
                </NextLink>
                <NextLink href="/register">
                    Register
                </NextLink>
            </Box >
    } else {
        body =
            <Box>
                <Box>Hello, {data.me.username}</Box>
                <NextLink href="/">
                    Home
                </NextLink>
                <NextLink href="/groups/all">
                    Groups
                </NextLink>
            </Box>

    }
    return (
        <React.Fragment>
            {body}
        </React.Fragment>
    )
}