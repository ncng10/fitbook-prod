import { IconButton } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { RiCheckLine } from 'react-icons/ri';
import * as Yup from 'yup';
import { useFriendsListQuery, useProgramQuery, useShareProgramMutation } from '../../../generated/graphql';
import { useGetIntId } from '../../../utils/useGetIntId';
interface ShareProgramFormProps {
    intId: number;
}

const ShareProgramForm: React.FC<ShareProgramFormProps> = ({ }) => {
    const requiredFriendId = (value) => {
        let error;
        if (value === 0) {
            error = 'Please choose a friend'
        }
        return error;
    }
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
                {({ validateForm, validateField }) => (
                    <Form>
                        <Field validate={requiredFriendId} as="select" name="sharedToId">
                            <option defaultValue="true">Friends</option>
                            {uniqueUser?.map((friend) => (
                                <option key={friend.id} value={friend.id}>{friend.username}</option>
                            ))}
                        </Field>
                        <IconButton onClick={() => validateField('sharedToId')} aria-label="share-program-confirmation" type="submit" icon={<RiCheckLine />} />
                    </Form>
                )}
            </Formik>
        </React.Fragment>
    );
}
export default ShareProgramForm