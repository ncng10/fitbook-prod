import { Box, Button, Flex } from '@chakra-ui/react';
import React from 'react';
import NextLink from "next/link";

interface LandingPageNavProps {

}

const LandingPageNav: React.FC<LandingPageNavProps> = ({ }) => {
    return (
        <React.Fragment>
            <Box>
                <Flex
                    mt={5}
                    justifyContent="space-between"
                >
                    <Box ml={5}>Fitbookit</Box>
                    <Flex >
                        <NextLink href="/login">
                            <Button borderRadius={15} fontWeight={600} h={35} background="#FFFFFF" mr={5} color="#6A6B6D">Login</Button>
                        </NextLink>
                        <NextLink href="/register">
                            <Button borderRadius={15} fontWeight={600} h={35} background="#FFFFFF" mr={5} color="#6A6B6D">Register</Button>
                        </NextLink>
                    </Flex>
                </Flex>
            </Box>
        </React.Fragment>
    );
}
export default LandingPageNav