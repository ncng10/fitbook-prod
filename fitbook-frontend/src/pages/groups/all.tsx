import { Box, Button } from '@chakra-ui/react';
import React from 'react'
import NextLink from "next/link"
import { useGroupsQuery } from '../../generated/graphql';
import { withApollo } from '../../utils/withApollo';
interface groupsProps {

}

const Groups: React.FC<groupsProps> = ({ }) => {
    const { data } = useGroupsQuery();
    console.log("data", data)
    return (
        <React.Fragment>
            <Box>
                <NextLink href="/groups/create">
                    <Button>Create a Group</Button>
                </NextLink>
            </Box>
            <Box>
                {data?.groups.map((group) => (
                    <Box key={group.groupName}>{group.groupName}</Box>
                ))}

            </Box>
        </React.Fragment>);
}
export default withApollo({ ssr: false })(Groups)