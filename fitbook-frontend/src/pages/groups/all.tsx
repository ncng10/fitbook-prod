import { Box, Button } from '@chakra-ui/react';
import React from 'react'
import NextLink from "next/link"
interface groupsProps {

}

const groups: React.FC<groupsProps> = ({ }) => {
    return (
        <React.Fragment>
            <Box>
                <NextLink href="/groups/create">
                    <Button>Create a Group</Button>
                </NextLink>
            </Box>
        </React.Fragment>);
}
export default groups