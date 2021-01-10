import { Box, Flex, Switch } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { MyContext } from "react-dom"
import CreateWorkoutForm from '../../../components/fitness/forms/CreateWorkoutForm';
import ShareProgramModal from '../../../components/fitness/ShareProgramModal';
import WorkoutsList from '../../../components/fitness/WorkoutsList';
import BottomNavigation from '../../../components/MobileViews/BottomNavigation';
import PageHeaders from '../../../components/MobileViews/PageHeaders';
import { useMeQuery, useProgramQuery } from '../../../generated/graphql';
import { useGetIntId } from '../../../utils/useGetIntId';
import { withApollo } from '../../../utils/withApollo';

interface ProgramProps {

}

const Program: React.FC<ProgramProps> = ({ }) => {
    const [detailsShowing, setDetailsShowing] = useState(false)
    const intId = useGetIntId();
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
        body =
            <Box>
                {sharedWithData?.program.creator.username === meData?.me.username ?
                    <Flex justifyContent="flex-end">
                        <Box mr={3} mt={3}>
                            <ShareProgramModal intId={intId} />
                        </Box>
                    </Flex>
                    : ""}
                <Box>
                </Box>
                <WorkoutsList detailsShowing={detailsShowing} />
                <CreateWorkoutForm />
            </Box>


    } else {
        <Box>Error....</Box>
    }

    return (
        <React.Fragment>
            <PageHeaders>
                <Box display="flex" flexDir="column" alignItems="center">
                    <Box>{sharedWithData?.program.programName}</Box>
                    <p style={{ fontSize: 15 }}>
                        {sharedWithData?.program.programCategory === "" ? "Uncategorized" : sharedWithData?.program.programCategory}
                    </p>
                </Box>
            </PageHeaders>
            <Switch onChange={detailsShowing === false ? () => setDetailsShowing(true) : () => setDetailsShowing(false)} />
            {body}
            <BottomNavigation />
        </React.Fragment>
    );
}
export default withApollo({ ssr: true })(Program)