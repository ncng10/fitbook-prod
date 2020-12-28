import { Box } from '@chakra-ui/react';
import React from 'react';
import { useFriendsListQuery } from '../../generated/graphql';
import { withApollo } from '../../utils/withApollo';
import NextLink from "next/link";
interface AllProps {

}

const All: React.FC<AllProps> = ({ }) => {

    const { data: friendsListData } = useFriendsListQuery();


    //not using [...new Set(arr)]
    const unique = (value, index, self) => {
        return self.indexOf(value) === index
    }

    const uniqueUser = friendsListData?.friendsList.filter(unique)


    return (
        <React.Fragment>
            My friends:
            <Box>
                {uniqueUser?.map((friend) => {
                    return (
                        <NextLink key={friend.id} href="/users/[username]" as={`/users/${friend.username}`}>
                            <Box>{friend.username}</Box>
                        </NextLink>
                    )
                })}
            </Box>
        </React.Fragment>
    );
}
export default withApollo({ ssr: false })(All)