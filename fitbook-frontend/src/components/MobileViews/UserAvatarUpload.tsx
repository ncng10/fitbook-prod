import { Avatar, Box, Flex } from '@chakra-ui/react';
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone';
import { useAddProfilePictureMutation, useUserProfileQuery } from '../../generated/graphql';
import { NavBar } from '../NavBar';
import BottomNavigation from './BottomNavigation';

interface UserAvatarUploadProps {

}

const UserAvatarUpload: React.FC<UserAvatarUploadProps> = ({ }) => {
    const { data } = useUserProfileQuery();

    const [upload] = useAddProfilePictureMutation();
    const onDrop = useCallback(
        ([file]) => {
            upload({
                variables: {
                    file
                },
                update: (cache) => {
                    cache.evict({ fieldName: "userProfile" });
                }
            })
        },
        [upload]
    );
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    return (
        <React.Fragment>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the files here ...</p>
                ) : (
                        <Flex flexDir="column" mt={5} width="100%" alignItems="center" justifyContent="center" >
                            <Avatar size="xl" src={`https://storage.googleapis.com/fitbook-production/${data?.userProfile?.profilePicture}`} />
                            <Box>Click to change your profile picture</Box>
                        </Flex>

                    )}
            </div>
            <BottomNavigation />
        </React.Fragment>
    );
}

export default UserAvatarUpload