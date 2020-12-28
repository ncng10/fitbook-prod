import { Avatar, Box, IconButton } from '@chakra-ui/react';
import React from 'react'
import { RiUserAddFill } from 'react-icons/ri';
import { useAddFriendMutation } from '../../generated/graphql';
import NextLink from 'next/link';

interface SearchListCardProps {
    username: string;
    profilePicture: string;
    id: number;
}

const SearchListCard: React.FC<SearchListCardProps> = ({ username, profilePicture, id }) => {

    const [addFriend] = useAddFriendMutation();

    return (
        <React.Fragment>
            <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                mt={5}
            >
                <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                    ml={5}
                >
                    <NextLink href="/users/[username]" as={`/users/${username}`}>

                        <Avatar
                            size="xl"
                            src={`https://storage.googleapis.com/fitbook-production/${profilePicture}`}
                        />

                    </NextLink>
                    <p style={{ fontSize: 25, marginLeft: 15 }}>{username}</p>
                </Box>
                <Box>
                    <IconButton
                        fontSize={25}
                        w={50}
                        h={50}
                        mr={5}
                        icon={<RiUserAddFill />}
                        aria-label="add-friend-button"
                        onClick={async () => {
                            addFriend({
                                variables: {
                                    input: {
                                        friendshipStatus: 0,
                                        userTwoIdentity: id
                                    }
                                }
                            })
                        }}
                    />
                </Box>
            </Box>
        </React.Fragment>
    );
}
export default SearchListCard