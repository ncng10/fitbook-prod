import { Avatar, Box, IconButton } from '@chakra-ui/react';
import React from 'react'
import { RiUserAddFill } from 'react-icons/ri';

interface SearchListCardProps {
    username: string;
    profilePicture: string;
}

const SearchListCard: React.FC<SearchListCardProps> = ({ username, profilePicture }) => {
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
                    <Avatar
                        size="xl"
                        src={`http://localhost:5001/images/${profilePicture}`}
                    />
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
                    />
                </Box>
            </Box>
        </React.Fragment>
    );
}
export default SearchListCard