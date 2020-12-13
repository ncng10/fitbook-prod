import React from 'react'
import { useMeQuery } from '../generated/graphql';
import NextLink from "next/link"
import { Avatar, Box, Button, IconButton, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Switch, Tooltip, useColorMode, useMediaQuery } from '@chakra-ui/react';
import { AiOutlineHome, AiOutlinePlusCircle } from "react-icons/ai"
import ProgramMenu from './ProgramMenu';
interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({ }) => {
    const [isLargerThan600] = useMediaQuery("(min-width:600px)");
    const { colorMode, toggleColorMode } = useColorMode();
    const isDark = colorMode === 'dark';
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
            !isLargerThan600 ?
                <Box mt={5} display="flex" justifyContent="flex-start" ml={5} >
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
                    <IconButton
                        aria-label="create-program-button"
                        icon={<AiOutlinePlusCircle fontSize={25} />}
                        bgColor="teal.500"
                    />
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
                    <ProgramMenu />
                </Box >
    };
    return (
        <React.Fragment>
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
                    <MenuGroup title="Profile">
                        <MenuItem>My Account</MenuItem>
                        <MenuItem>
                            <NextLink href="/groups/all">
                                Groups
                            </NextLink>
                        </MenuItem>
                        <MenuItem>
                            <NextLink href="/inbox/messages">
                                Inbox
                            </NextLink>
                        </MenuItem>
                    </MenuGroup>
                    <MenuDivider />
                </MenuList>
            </Menu>
            {body}
        </React.Fragment>
    )
}