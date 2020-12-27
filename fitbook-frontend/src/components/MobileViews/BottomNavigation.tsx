import { Box, IconButton, PopoverTrigger, Popover, PopoverArrow, PopoverContent, PopoverCloseButton, PopoverHeader, PopoverBody, VStack } from "@chakra-ui/react";
import React from 'react';
import { RiAddLine, RiHome2Line, RiHome3Line, RiNotification2Line, RiProfileLine, RiSearchEyeLine } from 'react-icons/ri';
import NextLink from "next/link";
import { useRouter } from "next/router";
interface BottomNavigationProps {

}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ }) => {
    const router = useRouter();
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
                <Popover>
                    <PopoverTrigger>

                        <IconButton aria-label="" style={{ fontSize: 25, width: "100%", backgroundColor: "#FFFFFF", outline: "none" }} icon={<RiAddLine />} />
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >What do you want to add?</PopoverHeader>
                        <PopoverBody>
                            <VStack>
                                <Box>Program</Box>
                                <Box>Workout</Box>
                                <Box>Exercise</Box>
                            </VStack>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
                <IconButton aria-label="" style={{ fontSize: 25, width: "100%", backgroundColor: "#FFFFFF", outline: "none" }} icon={<RiNotification2Line />} />
                <IconButton aria-label="" style={{ fontSize: 25, width: "100%", backgroundColor: "#FFFFFF", outline: "none" }} icon={<RiProfileLine />} />
            </Box>
            <Box>

            </Box>
        </React.Fragment>
    );
}
export default BottomNavigation