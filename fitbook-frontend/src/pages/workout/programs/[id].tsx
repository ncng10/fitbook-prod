import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import CreateWorkoutForm from '../../../components/fitness/forms/CreateWorkoutForm';
import ShareProgramPopover from '../../../components/fitness/ShareProgramPopover';
import WorkoutsList from '../../../components/fitness/WorkoutsList';
import BottomNavigation from '../../../components/MobileViews/BottomNavigation';
import { useMeQuery, useProgramQuery } from '../../../generated/graphql';
import { useGetIntId } from '../../../utils/useGetIntId';
import { withApollo } from '../../../utils/withApollo';

interface ProgramProps {

}

const Program: React.FC<ProgramProps> = ({ }) => {
    const intId = useGetIntId();
    const router = useRouter();
    const { data: meData } = useMeQuery();
    const { data: sharedWithData } = useProgramQuery({
        skip: intId === -1,
        variables: {
            input: intId
        }
    });

    //checks to see if the currently logged in user is included in the sharedWith array. if length = 0, it is not shared with the user
    //if length = 1 it is shared with the user
    const validSharedUserLength = sharedWithData?.program.sharedWith.filter(x => x.username === meData?.me.username).length;

    let body;
    //in order to not be authorized, the user is not included in the sharedWith array (length = 0) and the creator of the program is not them (username !== creator)
    if (validSharedUserLength === 0 && sharedWithData?.program.creator.username !== meData?.me.username) {
        body = <Box>Not authorized</Box>

        //if the user meets one of the two conditions, they are authorized.
    } else if (sharedWithData?.program.creator.username === meData?.me.username || validSharedUserLength === 1) {
        body = <Box>
            Program number {intId}
            <Box>
                <Box>Your workouts:</Box>
                <Box>
                    {sharedWithData?.program.creator.username === meData?.me.username ? <ShareProgramPopover intId={intId} /> : ""}
                        Shared With:
                        {sharedWithData?.program.sharedWith.map((sharedWithUser) => (
                        <p>{sharedWithUser.username}</p>
                    ))}
                </Box>
                <WorkoutsList />
                <CreateWorkoutForm />
            </Box>
        </Box>
    } else {
        <Box>Error....</Box>
    }

    return (
        <React.Fragment>
            {body}
            <BottomNavigation />
        </React.Fragment>
    );
}
export default withApollo({ ssr: true })(Program)