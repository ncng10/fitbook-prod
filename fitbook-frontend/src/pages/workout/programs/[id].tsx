import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import CreateWorkoutForm from '../../../components/fitness/forms/CreateWorkoutForm';
import BottomNavigation from '../../../components/MobileViews/BottomNavigation';
import ShareProgramPopover from '../../../components/fitness/ShareProgramPopover';
import WorkoutsList from '../../../components/fitness/WorkoutsList';
import { useProgramQuery } from '../../../generated/graphql';
import { useGetIntId } from '../../../utils/useGetIntId';
import { withApollo } from '../../../utils/withApollo';

interface ProgramProps {

}

const Program: React.FC<ProgramProps> = ({ }) => {
    const intId = useGetIntId();
    const router = useRouter();
    const { data: sharedWithData } = useProgramQuery({
        skip: intId === -1,
        variables: {
            input: intId
        }
    });
    return (
        <React.Fragment>
            Program number {intId}
            <Box>
                <Box>Your workouts:</Box>
                <Box>
                    <ShareProgramPopover intId={intId} />
                    Shared With:
                    {sharedWithData?.program.sharedWith.map((sharedWithUser) => (
                        <p>{sharedWithUser.username}</p>
                    ))}
                </Box>
                <WorkoutsList />
                <CreateWorkoutForm />
            </Box>
            <BottomNavigation />
        </React.Fragment>
    );
}
export default withApollo({ ssr: true })(Program)