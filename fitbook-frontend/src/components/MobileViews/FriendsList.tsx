import { Box } from '@chakra-ui/react';
import NextLink from "next/link";
import React from 'react';
import { useFriendsListQuery } from '../../generated/graphql';
import SearchListCard from './SearchListCard';

interface FriendsListProps {

}

const FriendsList: React.FC<FriendsListProps> = ({ }) => {
    const { data: friendsListData } = useFriendsListQuery();


    //not using [...new Set(arr)]
    const unique = (value, index, self) => {
        return self.indexOf(value) === index
    }

    const uniqueUser = friendsListData?.friendsList.filter(unique)


    return (
        <React.Fragment>
            <Box >
                My friends:
            <Box >
                    {uniqueUser?.map((friend) => {
                        return (
                            <NextLink key={friend.id} href="/users/[username]" as={`/users/${friend.username}`}>
                                <SearchListCard
                                    username={friend.username}
                                    id={friend.id}
                                    profilePicture={friend.profilePicture}
                                />
                            </NextLink>
                        )
                    })}
                </Box>
            </Box>
        </React.Fragment>
    );
}

export default FriendsList