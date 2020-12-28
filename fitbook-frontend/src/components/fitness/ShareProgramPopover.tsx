import { Button, IconButton, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import React from 'react'
import { RiCheckLine } from 'react-icons/ri';
import { useFriendsListQuery, useShareProgramMutation, useProgramQuery } from '../../generated/graphql';
import { useGetIntId } from '../../utils/useGetIntId';
import ShareProgramForm from './forms/ShareProgramForm';

interface ShareProgramPopoverProps {
    intId: number;
}

const ShareProgramPopover: React.FC<ShareProgramPopoverProps> = ({ }) => {
    const intId = useGetIntId();
    const { data: shareToFriendsData } = useFriendsListQuery();
    const [shareProgram] = useShareProgramMutation();
    const unique = (value, index, self) => {
        return self.indexOf(value) === index
    };
    const uniqueUser = shareToFriendsData?.friendsList.filter(unique);
    return (
        <React.Fragment>
            <Popover>
                <PopoverTrigger>
                    <Button>Share</Button>
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Confirmation!</PopoverHeader>
                    <PopoverBody>
                        <Formik
                            initialValues={{ programId: intId, sharedToId: "0" }}
                            onSubmit={async (values) => {
                                await shareProgram({
                                    variables: {
                                        input: {
                                            programId: intId,
                                            sharedToId: parseInt(values.sharedToId)
                                        }
                                    }
                                })
                            }}
                        >
                            <Form>
                                <Field as="select" name="sharedToId">
                                    <option defaultValue="true">Friends</option>
                                    {uniqueUser?.map((friend) => {
                                        return (
                                            <option key={friend.id} value={friend.id}>{friend.username}</option>
                                        )
                                    })}
                                </Field>
                                <IconButton aria-label="share-program-confirmation" type="submit" icon={<RiCheckLine />} />
                            </Form>
                        </Formik>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </React.Fragment>
    );
}
export default ShareProgramPopover