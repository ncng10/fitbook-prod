import { IconButton } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik'
import { useRouter } from 'next/router';
import React from 'react'
import { RiCheckLine } from 'react-icons/ri';
import { useFriendsListQuery, useProgramQuery, useShareProgramMutation } from '../../../generated/graphql';
import { useGetIntId } from '../../../utils/useGetIntId';
import { InputField } from '../../InputField';

interface ShareProgramFormProps {
    intId: number;
}

const ShareProgramForm: React.FC<ShareProgramFormProps> = ({ }) => {
    const intId = useGetIntId();
    const { data: shareToFriendsData } = useFriendsListQuery();
    const [shareProgram] = useShareProgramMutation();
    const { data: programData } = useProgramQuery({
        skip: intId === -1,
        variables: {
            input: intId
        }
    });
    const unique = (value, index, self) => {
        return self.indexOf(value) === index
    };
    const uniqueUser = shareToFriendsData?.friendsList.filter(unique);
    return (
        <React.Fragment>
            <Formik
                initialValues={{ programId: intId, sharedToId: 0 }}
                onSubmit={async (values) => {
                    console.log(values)
                    await shareProgram({
                        variables: {
                            input: values
                        }
                    })
                }}
            >
                <Form>
                    <Field as="select" name="sharedToId">
                        <option defaultValue="true">Friends</option>
                        {uniqueUser?.map((friend) => (
                            <option key={friend.id} value={friend.id}>{friend.username}</option>
                        ))}
                    </Field>
                    <IconButton aria-label="share-program-confirmation" type="submit" icon={<RiCheckLine />} />
                </Form>
            </Formik>
        </React.Fragment>
    );
}
export default ShareProgramForm