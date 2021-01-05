import { Box, IconButton } from "@chakra-ui/react";
import { Badge } from "@material-ui/core";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from 'react';
import { RiHome3Line, RiNotification2Line, RiProfileLine, RiSearchEyeLine } from 'react-icons/ri';
import { useNewFriendRequestSubscription, useNewSharedProgramSubscription, usePendingFriendsQuery, useUserProfileQuery } from "../../generated/graphql";
import ProgramMenu from "../fitness/ProgramMenu";
interface BottomNavigationProps {

}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ }) => {
    const router = useRouter();
    const { data: sharedProgramSubscription } = useNewSharedProgramSubscription();
    const { data } = useUserProfileQuery();
    const { data: friendRequestSubscription } = useNewFriendRequestSubscription();
    const { data: pendingFriendsData } = usePendingFriendsQuery();
    return (
        <React.Fragment>
            <Box
                width="100%"
                display="flex"
                flexDir="row"
                alignItems="center"
                justifyContent="space-between"
                boxShadow="  0px -1px 4px lightgray"
                position="fixed"
                height="3.5rem"
                bottom={0}
                backgroundColor="#FFFFFF"
            >
                {/* <NextLink href="/dashboard">
                    <IconButton
                        aria-label=""
                        style={router.pathname === "/dashboard" ?
                            { fontSize: 25, width: "100%", backgroundColor: "#FFFFFF", outline: "none", color: "#3C3D66" }
                            :
                            { fontSize: 25, width: "100%", backgroundColor: "#FFFFFF", outline: "none" }} icon={<RiHome3Line />} />
                </NextLink> */}
                <NextLink href="/search">
                    <IconButton
                        aria-label=""
                        style={router.pathname === "/search" ?
                            { fontSize: 30, width: "100%", backgroundColor: "#FFFFFF", outline: "none", color: "#3C3D66" }
                            :
                            { fontSize: 30, width: "100%", backgroundColor: "#FFFFFF", outline: "none" }} icon={<RiSearchEyeLine />} />
                </NextLink>
                <ProgramMenu />
                <NextLink href="/notifications">
                    {friendRequestSubscription?.newFriendRequest &&
                        friendRequestSubscription?.newFriendRequest.userTwoIdentity === data?.userProfile.id
                        ||
                        pendingFriendsData?.pendingFriends.length >= 1 ?
                        <IconButton aria-label="" style={router.pathname === "/notifications" ?
                            { fontSize: 30, width: "100%", backgroundColor: "#FFFFFF", outline: "none", color: "red" }
                            :
                            { fontSize: 30, width: "100%", backgroundColor: "#FFFFFF", outline: "none", color: "red" }} icon={<RiNotification2Line />} />
                        :
                        <IconButton aria-label="" style={router.pathname === "/notifications" ?
                            { fontSize: 30, width: "100%", backgroundColor: "#FFFFFF", outline: "none", color: "#3C3D66" }
                            :
                            { fontSize: 30, width: "100%", backgroundColor: "#FFFFFF", outline: "none" }} icon={<RiNotification2Line />} />
                    }
                </NextLink>
                <NextLink href="/profile">
                    <IconButton aria-label="" style={router.pathname === "/profile" ?
                        { fontSize: 30, width: "100%", backgroundColor: "#FFFFFF", outline: "none", color: "#3C3D66" }
                        :
                        { fontSize: 30, width: "100%", backgroundColor: "#FFFFFF", outline: "none" }} icon={<RiProfileLine />} />
                </NextLink>
            </Box>
        </React.Fragment>
    );
}
export default BottomNavigation