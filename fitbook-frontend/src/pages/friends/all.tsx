import { Box } from '@chakra-ui/react';
import React from 'react';
import { useFriendsListQuery } from '../../generated/graphql';
import { withApollo } from '../../utils/withApollo';

interface AllProps {

}

const All: React.FC<AllProps> = ({ }) => {

    const { data: friendsListData } = useFriendsListQuery();

    return (
        <React.Fragment>
            My friends:
            <Box>
                {friendsListData?.friendsList.map((friend) => {
                    return (
                        <Box>
                            <Box>{friend.username}</Box>
                        </Box>
                    )
                })}
            </Box>
        </React.Fragment>
    );
}
export default withApollo({ ssr: false })(All)