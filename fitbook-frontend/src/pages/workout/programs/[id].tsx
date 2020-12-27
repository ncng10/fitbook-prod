import { Box, IconButton } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react'
import { AiOutlineEye } from 'react-icons/ai';
import CreateWorkoutForm from '../../../components/CreateWorkoutForm';
import BottomNavigation from '../../../components/MobileViews/BottomNavigation';
import { NavBar } from '../../../components/NavBar';
import WorkoutsList from '../../../components/WorkoutsList';
import { useGetIntId } from '../../../utils/useGetIntId';
import { withApollo } from '../../../utils/withApollo';

interface ProgramProps {

}

const Program: React.FC<ProgramProps> = ({ }) => {
    const intId = useGetIntId();
    const router = useRouter();
    return (
        <React.Fragment>
            Program number {intId}
            <Box>
                <Box>Your workouts:</Box>
                <WorkoutsList />
                <CreateWorkoutForm />
            </Box>
            <BottomNavigation />
        </React.Fragment>
    );
}
export default withApollo({ ssr: false })(Program)