import { Box } from '@chakra-ui/react';
import NextLink from "next/link";
import React from 'react';
import { useWorkoutsQuery } from '../../generated/graphql';
import { useGetIntId } from '../../utils/useGetIntId';
import WorkoutCard from './WorkoutCard';
import WorkoutsCarousel from './WorkoutsCarousel';
interface WorkoutsListProps {
    detailsShowing?: boolean;
}

const WorkoutsList: React.FC<WorkoutsListProps> = ({ detailsShowing }) => {

    const intId = useGetIntId();

    const { data, loading, error } = useWorkoutsQuery({
        skip: intId === -1,
        variables: {
            programId: intId
        }
    });

    let body;
    if (data?.workouts.length > 0) {
        body =
            <Box>
                <WorkoutsCarousel detailsShowing={detailsShowing} />
            </Box>
    } else {
        body =
            <Box>
                No workouts, try adding one :-D
        </Box>
    };

    return (
        <React.Fragment>
            {body}
        </React.Fragment>
    );
}

export default WorkoutsList