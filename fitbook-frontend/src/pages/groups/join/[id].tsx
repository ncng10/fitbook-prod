import { Box, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react'
import { useGroupQuery, useJoinGroupMutation } from '../../../generated/graphql';
import { useGetIntId } from '../../../utils/useGetIntId';
import { withApollo } from '../../../utils/withApollo';



const JoinGroup: React.FC = ({ }) => {
    const router = useRouter();
    const intId = useGetIntId();
    const { data } = useGroupQuery({
        variables: {
            id: intId,
        },
    });
    const [joinGroup] = useJoinGroupMutation()
    return (
        <React.Fragment>
            <div>Are you sure you want to join group {data?.group.groupName}?</div>
            <Box>
                <Button onClick={async () => {
                    const { errors } = await joinGroup({
                        variables: {
                            input: {
                                groupId: intId
                            },
                        },
                        update: (cache) => {
                            cache.evict({ fieldName: "groups:{}" });
                        }
                    })
                    if (!errors) {
                        router.push('/groups/all');
                    }
                }
                }>
                    Yes
                </Button>
                <Button>
                    Go Back
                </Button>
            </Box>
        </React.Fragment>
    );
}
export default withApollo({ ssr: true })(JoinGroup)