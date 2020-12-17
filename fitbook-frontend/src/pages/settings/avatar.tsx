import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { NavBar } from '../../components/NavBar';
import { useAddProfilePictureMutation } from '../../generated/graphql';
import { withApollo } from '../../utils/withApollo';

interface AvatarProps {

}

const Avatar: React.FC<AvatarProps> = ({ }) => {

    const [upload] = useAddProfilePictureMutation();
    const onDrop = useCallback(
        ([file]) => {
            console.log(file)
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
            <NavBar />
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the files here ...</p>
                ) : (
                        <p>Drag your image here, or click to select a file.</p>
                    )}
            </div>
        </React.Fragment>
    );
}
export default withApollo({ ssr: false })(Avatar)