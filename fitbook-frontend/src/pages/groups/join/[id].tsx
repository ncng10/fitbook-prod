import React from 'react'
import { useJoinGroupMutation } from '../../../generated/graphql';
import { useGetIntId } from '../../../utils/useGetIntId';
import { withApollo } from '../../../utils/withApollo';



const JoinGroup: React.FC = ({ }) => {
    const intId = useGetIntId();
    const [joinGroup] = useJoinGroupMutation({
        variables: {
            input: {
                groupId: intId
            }
        }
    })
    console.log(intId)
    return (
        <React.Fragment>
            <div>Are you sure you want to join group {intId}?</div>
        </React.Fragment>
    );
}
export default withApollo({ ssr: false })(JoinGroup)