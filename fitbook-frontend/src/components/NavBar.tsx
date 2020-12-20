import { useApolloClient } from '@apollo/client';
import { Avatar, Box, Button, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Switch, Text, useColorMode, useMediaQuery, IconButton } from '@chakra-ui/react';
import NextLink from "next/link";
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { useLogoutMutation, useUserProfileQuery } from '../generated/graphql';
import ProgramMenu from './ProgramMenu';
interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({ }) => {
    const [isLargerThan600] = useMediaQuery("(min-width:600px)");
    const [logout] = useLogoutMutation();
    const { data } = useUserProfileQuery();
    const apolloClient = useApolloClient();
    const router = useRouter();
    let body = null;

    if (!data?.userProfile) {
        body =
            <Box mt={5}>
                <NextLink href="/login">
                    <Button bgColor="teal.500">
                        Login
                   </Button>
                </NextLink>
                <NextLink href="/register">
                    <Button bgColor="teal.500">
                        Register
                   </Button>
                </NextLink>
            </Box >
    } else {
        body =
            <Box
                className="navBar"
                mt={5} display="flex" justifyContent="flex-start" ml={5}
            >
                <Box cursor="pointer" display="flex" flexDirection="row">
                    <NextLink href="/">
                        <Box mr={5}>
                            <Text>Home</Text>
                        </Box>
                    </NextLink>
                </Box>
                <Box
                    top="1.5rem"
                    display='flex'
                    right="4.75rem"
                    position="fixed"
                >
                    <NextLink href="/workout/programs/all">
                        <Box
                            mr={12}
                            cursor="pointer">
                            <IconButton mt={-1}
                                borderRadius={50}
                                position="fixed"
                                aria-label="list-of-programs-button"
                                icon={<AiOutlineUnorderedList />}
                            />
                        </Box>
                    </NextLink>
                </Box>
                <Menu>
                    <MenuButton
                        cursor="pointer"
                        size="md"
                        as={Avatar}
                        src={`http://localhost:5001/images/${data?.userProfile?.profilePicture}`}
                        position="fixed"
                        bg="lightgray"
                        top="1rem"
                        right="1.25rem"
                    />
                    <MenuList>
                        <MenuGroup title={`${data?.userProfile.username}`}>
                            <MenuDivider />
                            <NextLink href="/settings/avatar">
                                <MenuItem>
                                    My Account
                        </MenuItem>
                            </NextLink>

                            <NextLink href="/groups/all">
                                <MenuItem>
                                    Groups
                        </MenuItem>
                            </NextLink>

                            <NextLink href="/inbox/messages">
                                <MenuItem>
                                    Inbox
                            </MenuItem>
                            </NextLink>

                            <MenuDivider />
                            <MenuItem onClick={async () => {
                                await logout();
                                apolloClient.resetStore();
                                router.push("/")
                            }}>
                                Logout
                        </MenuItem>
                        </MenuGroup>
                    </MenuList>
                </Menu>
            </Box >
    };
    return (
        <React.Fragment>

            {body}
        </React.Fragment>
    )
}