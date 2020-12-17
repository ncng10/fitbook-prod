import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
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
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    )}
            </div>
        </React.Fragment>
    );
}
export default withApollo({ ssr: false })(Avatar)