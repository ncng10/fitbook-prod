import React from 'react'
import { useMeQuery, useLogoutMutation } from '../generated/graphql';
import NextLink from "next/link"
import { Avatar, Box, Button, IconButton, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Switch, Tooltip, useColorMode, useMediaQuery } from '@chakra-ui/react';
import { AiOutlineHome, AiOutlinePlusCircle, AiOutlineUnorderedList } from "react-icons/ai"
import ProgramMenu from './ProgramMenu';
import { useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';
interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({ }) => {
    const [isLargerThan600] = useMediaQuery("(min-width:600px)");
    const [logout] = useLogoutMutation();
    const { colorMode, toggleColorMode } = useColorMode();
    const isDark = colorMode === 'dark';
    const { data } = useMeQuery();
    const apolloClient = useApolloClient();
    const router = useRouter();
    let body = null;
    if (!data?.me) {
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
            !isLargerThan600 ?
                <Box mt={5} display="flex" w="100%" justifyContent="flex-start" ml={5} >
                    <Switch
                        position="fixed"
                        top="1.5rem"
                        right="4.5em"
                        color="green"
                        size="lg"
                        isChecked={isDark}
                        onChange={toggleColorMode}
                    />
                    <Menu>
                        <MenuButton
                            size="md"
                            as={Avatar}
                            position="fixed"
                            bg="teal.500"
                            top="1rem"
                            right=".75rem"
                            color="green"
                        />
                        <MenuList>
                            <MenuGroup title={`${data?.me.username}`}>
                                <MenuDivider />
                                <MenuItem>
                                    My Account
                        </MenuItem>

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
                    <Box display="flex"
                        justifyContent="space-around"
                        alignItems="center"
                        width="100%"
                        position="fixed"
                        bottom={5}
                        ml={-5}
                    >
                        <NextLink href="/">
                            <IconButton
                                mr={5}
                                aria-label="home-button"
                                icon={<AiOutlineHome fontSize={25} />}
                                bgColor="teal.500"
                            />
                        </NextLink>
                        <NextLink href="/workout/programs/all">
                            <IconButton
                                mr={5}
                                aria-label="view-programs-button"
                                icon={<AiOutlineUnorderedList fontSize={25} />}
                                bgColor="teal.500"
                            />
                        </NextLink>
                        <ProgramMenu />
                    </Box>
                </Box>
                :
                <Box mt={5} display="flex" justifyContent="flex-start" ml={5}>
                    <Tooltip label="Home" aria-label="Home">
                        <NextLink href="/">
                            <IconButton
                                mr={5}
                                aria-label="home-button"
                                icon={<AiOutlineHome fontSize={25} />}
                                bgColor="teal.500"
                            />
                        </NextLink>
                    </Tooltip>
                    <NextLink href="/workout/programs/all">
                        <IconButton
                            mr={5}
                            aria-label="view-programs-button"
                            icon={<AiOutlineUnorderedList fontSize={25} />}
                            bgColor="teal.500"
                        />
                    </NextLink>
                    <ProgramMenu />
                    <Switch
                        position="fixed"
                        top="1.5rem"
                        right="4.5em"
                        color="green"
                        size="lg"
                        isChecked={isDark}
                        onChange={toggleColorMode}
                    />
                    <Menu>
                        <MenuButton
                            size="md"
                            as={Avatar}
                            position="fixed"
                            bg="teal.500"
                            top="1rem"
                            right=".75rem"
                            color="green"
                        />
                        <MenuList>
                            <MenuGroup title={`${data?.me.username}`}>
                                <MenuDivider />
                                <MenuItem>
                                    My Account
                        </MenuItem>

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