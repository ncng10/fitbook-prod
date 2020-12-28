import { useApolloClient } from '@apollo/client';
import { Avatar, Box, Button, IconButton, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Text, useMediaQuery, useToast } from '@chakra-ui/react';
import { Badge } from '@material-ui/core';
import NextLink from "next/link";
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { RiUser2Fill } from 'react-icons/ri';
import { useLogoutMutation, useNewFriendRequestSubscription, usePendingFriendsQuery, useUserProfileQuery } from '../generated/graphql';
interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({ }) => {
    const [isLargerThan600] = useMediaQuery("(min-width:600px)");
    const toast = useToast()
    const [toaster, setToaster] = useState(false)
    const [logout] = useLogoutMutation();
    const { data } = useUserProfileQuery();
    const apolloClient = useApolloClient();
    const router = useRouter();
    let body = null;
    const { data: friendRequestSubsciptionData } = useNewFriendRequestSubscription();
    const { data: pendingFriendsData } = usePendingFriendsQuery();
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
                backgroundColor="#F9F6EC"
                className="navBar"
                display="flex" justifyContent="flex-start"
            >
                <Box
                    top="1.5rem"
                    display='flex'
                    right="4.75rem"
                    position="fixed"
                >
                    <Box cursor="pointer" position="fixed" left={5} top={7} >
                        <NextLink href="/dashboard">
                            <Box mr={5}>
                                <Text>Home</Text>
                            </Box>
                        </NextLink>
                    </Box>
                    <Box
                        mr={5}
                        marginTop="-.25rem"
                    >
                        {friendRequestSubsciptionData?.newFriendRequest &&
                            friendRequestSubsciptionData?.newFriendRequest.userTwoIdentity === data?.userProfile.id
                            ||
                            pendingFriendsData?.pendingFriends.length >= 1

                            ?
                            <NextLink href={router.pathname === "/friends/pending" ? "" : "/friends/pending"}>
                                <Badge
                                    color="secondary"
                                    variant="dot"
                                >
                                    <IconButton
                                        aria-label="pending-friend-requests-button"
                                        icon={<RiUser2Fill />}
                                        borderRadius={50} />
                                </Badge>
                            </NextLink>
                            :
                            <NextLink href={router.pathname === "/friends/pending" ? "" : "/friends/pending"}>
                                <Badge
                                    color="secondary"
                                >
                                    <IconButton
                                        aria-label="pending-friend-requests-button"
                                        icon={<RiUser2Fill />}
                                        borderRadius={50} />
                                </Badge>
                            </NextLink>
                        }
                    </Box>
                </Box>
                <Menu>
                    <MenuButton
                        cursor="pointer"
                        size="md"
                        as={Avatar}
                        src={`https://storage.googleapis.com/fitbook-production/${data?.userProfile?.profilePicture}`}
                        position="fixed"
                        bg="lightgray"
                        top="1rem"
                        right="1.25rem"
                    />
                    <MenuList>
                        <MenuGroup title={`${data?.userProfile.username}`}>
                            <MenuDivider />
                            <NextLink href="/workout/programs/all">

                                <MenuItem>
                                    My Programs
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
                            <NextLink href="/settings/avatar">
                                <MenuItem>
                                    My Account
                        </MenuItem>
                            </NextLink>
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