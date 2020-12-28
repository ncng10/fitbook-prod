import { Avatar, Box, Flex } from '@chakra-ui/react';
import React from 'react';
interface UserProfileCardProps {
    profilePicture: string;
    username: string;
}
//profile card for every user except for the currently logged in user
const UserProfileCard: React.FC<UserProfileCardProps> = ({ profilePicture, username }) => {
    return (
        <React.Fragment>
            <Box>
                <Flex mt={5} ml={5} alignItems="center">
                    <Avatar size="xl" src={`https://storage.googleapis.com/fitbook-production/${profilePicture}`} />
                    <Box ml={5}>
                        <h3 style={{ fontSize: 25, fontWeight: 700 }}>{username}</h3>
                    </Box>
                </Flex>
                {/* <Box onClick={async () => {
                    await logout();
                    apolloClient.resetStore();
                    router.push("/")
                }}>Logout</Box> */}
            </Box>
        </React.Fragment>
    );
}
export default UserProfileCard