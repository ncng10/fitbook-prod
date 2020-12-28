import { Box, IconButton, PopoverTrigger, Popover, PopoverArrow, PopoverContent, PopoverCloseButton, PopoverHeader, PopoverBody, VStack } from "@chakra-ui/react";
import React from 'react';
import { RiAddLine, RiHome2Line, RiHome3Line, RiNotification2Line, RiProfileLine, RiSearchEyeLine } from 'react-icons/ri';
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Badge } from "@material-ui/core";
import { useNewSharedProgramSubscription } from "../../generated/graphql";
import ProgramMenu from "../ProgramMenu";
interface BottomNavigationProps {

}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ }) => {
    const router = useRouter();
    const { data: sharedProgramSubscription } = useNewSharedProgramSubscription();
    return (
        <React.Fragment>
            <Box
                width="100%"
                display="flex"
                flexDir="row"
                alignItems="center"
                justifyContent="space-between"
                position="fixed"
                bottom={2}
            >
                <NextLink href="/dashboard">
                    <IconButton
                        aria-label=""
                        style={router.pathname === "/dashboard" ?
                            { fontSize: 25, width: "100%", backgroundColor: "#FFFFFF", outline: "none", color: "#86574d" }
                            :
                            { fontSize: 25, width: "100%", backgroundColor: "#FFFFFF", outline: "none" }} icon={<RiHome3Line />} />
                </NextLink>
                <NextLink href="/search">
                    <IconButton
                        aria-label=""
                        style={router.pathname === "/search" ?
                            { fontSize: 25, width: "100%", backgroundColor: "#FFFFFF", outline: "none", color: "#86574d" }
                            :
                            { fontSize: 25, width: "100%", backgroundColor: "#FFFFFF", outline: "none" }} icon={<RiSearchEyeLine />} />
                </NextLink>
                <ProgramMenu />
                <NextLink href="/notifications">
                    {sharedProgramSubscription ? <Badge color="secondary" variant="dot">
                        <IconButton aria-label="" style={router.pathname === "/notifications" ?
                            { fontSize: 25, width: "100%", backgroundColor: "#FFFFFF", outline: "none", color: "#86574d" }
                            :
                            { fontSize: 25, width: "100%", backgroundColor: "#FFFFFF", outline: "none" }} icon={<RiNotification2Line />} />
                    </Badge> :
                        <IconButton aria-label="" style={router.pathname === "/notifications" ?
                            { fontSize: 25, width: "100%", backgroundColor: "#FFFFFF", outline: "none", color: "#86574d" }
                            :
                            { fontSize: 25, width: "100%", backgroundColor: "#FFFFFF", outline: "none" }} icon={<RiNotification2Line />} />
                    }
                </NextLink>
                <NextLink href="/profile">
                    <IconButton aria-label="" style={router.pathname === "/profile" ?
                        { fontSize: 25, width: "100%", backgroundColor: "#FFFFFF", outline: "none", color: "#86574d" }
                        :
                        { fontSize: 25, width: "100%", backgroundColor: "#FFFFFF", outline: "none" }} icon={<RiProfileLine />} />
                </NextLink>
            </Box>
            <Box>

            </Box>
        </React.Fragment>
    );
}
export default BottomNavigation