import { Avatar, Box } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';

interface SearchListCardProps {
    username: string;
    profilePicture: string;
    id: number;
}

const SearchListCard: React.FC<SearchListCardProps> = ({ username, profilePicture, id }) => {
    return (
        <React.Fragment>
            <Box
                display="flex"
                height={75}
                justifyContent="center"
                alignItems="center"
                width="100%"
                mt={10}
            >
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <NextLink href="/users/[username]" as={`/users/${username}`}>

                        <Avatar
                            size="lg"
                            src={`https://storage.googleapis.com/fitbook-production/${profilePicture}`}
                        />
                    </NextLink>
                    <p style={{ fontSize: 25, marginLeft: 15 }}>{username}</p>
                </Box>
            </Box>
        </React.Fragment>
    );
}
export default SearchListCard