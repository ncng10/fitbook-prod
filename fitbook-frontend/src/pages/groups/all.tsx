import { Box, Button, Flex, Text } from '@chakra-ui/react';
import React from 'react'
import NextLink from "next/link"
import { useGroupsQuery, useMeQuery } from '../../generated/graphql';
import { withApollo } from '../../utils/withApollo';
import { NavBar } from '../../components/NavBar';
interface groupsProps {

}

const Groups: React.FC<groupsProps> = ({ }) => {
    const { data } = useGroupsQuery({});
    const { data: meData } = useMeQuery();
    let body = null;
    if (!data) {
        body = <Box>No groups so show...</Box>
    } else {
        body =
            <div
                style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", width: 1000, justifyContent: "center", alignItems: "center" }}
            >
                {data?.groups.map((group) => (
                    <Box w={250} h={250} borderWidth="1px" mr={5} mt={5} key={group.groupName} borderRadius={10}>
                        <Flex align="center" justify="center" direction="column">
                            <Flex align="baseline">
                                <Text fontSize={24}>{group.groupName}</Text>
                            </Flex>
                            <Flex mt={75} align="center" justify="center" direction="column">
                                <Text>Creator: {group.creator.username}</Text>
                                <Text>Category: {group.groupCategory}</Text>
                                <Box mt={5}>
                                    <NextLink href="/groups/join/[id]" as={`/groups/join/${group.id}`}>
                                        <Button>Join Group</Button>
                                    </NextLink>
                                </Box>
                            </Flex>
                        </Flex>
                    </Box>
                ))}
            </div>
    }

    return (
        <React.Fragment>
            <NavBar />
            <div
                style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 25 }}
            >
                {body}
            </div>
            <Box>
                <NextLink href="/groups/create">
                    <Button>Create a Group</Button>
                </NextLink>
            </Box>
        </React.Fragment>);
}
export default withApollo({ ssr: true })(Groups)