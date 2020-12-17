import { useApolloClient } from '@apollo/client';
import { Avatar, Box, Button, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Switch, Text, useColorMode, useMediaQuery, IconButton } from '@chakra-ui/react';
import NextLink from "next/link";
import { useRouter } from 'next/router';
import React from 'react';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import ProgramMenu from './ProgramMenu';
interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({ }) => {
    const [isLargerThan600] = useMediaQuery("(min-width:600px)");
    const [logout] = useLogoutMutation();
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
                    <Box
                        className="navBar"
                        display="flex"
                        justifyContent="space-around"
                        alignItems="center"
                        width="100%"
                        position="fixed"
                        bottom={5}
                        ml={-5}
                    >
                        <NextLink href="/">
                            <Text>Programs</Text>
                        </NextLink>
                        <NextLink href="/workout/programs/all">
                            <Text>Programs</Text>
                        </NextLink>
                        <ProgramMenu />
                    </Box>
                </Box>
                :
                <Box
                    className="navBar"
                    mt={5} display="flex" justifyContent="flex-start" ml={5}>
                    <Box cursor="pointer" display="flex" flexDirection="row">
                        <NextLink href="/">
                            <Box mr={5}>
                                <Text>Home</Text>
                            </Box>
                        </NextLink>
                    </Box>
                    <Box
                        top="1.5rem"
                        position="fixed"
                        display='flex'
                        right="4.95rem"
                    >
                        <NextLink href="/workout/programs/all">
                            <Box cursor="pointer" mr={5}>
                                <IconButton mt={-1}
                                    borderRadius={50}
                                    aria-label="list-of-programs-button"
                                    icon={<AiOutlineUnorderedList />}
                                />
                            </Box>
                        </NextLink>
                        <Box mt={-1}>
                            <ProgramMenu />
                        </Box>
                    </Box>
                    <Menu>
                        <MenuButton
                            size="sm"
                            as={Avatar}
                            src={`http://localhost:5001/images/${data?.me.profilePicture}`}
                            position="fixed"
                            bg="lightgray"
                            top="1.5rem"
                            right="1.25rem"
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