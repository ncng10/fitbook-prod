import { Box } from '@chakra-ui/react';
import React from 'react';
import BottomNavigation from '../components/MobileViews/BottomNavigation';
import UserProfileCard from '../components/MobileViews/UserProfileCard';
import ProgramsCarousel from '../components/ProgramsCarousel';
import SharedProgramsCarousel from '../components/SharedProgramsCarousel';
import { withApollo } from '../utils/withApollo';

interface ProfileProps {

}

const Profile: React.FC<ProfileProps> = ({ }) => {

    return (
        <React.Fragment>
            <UserProfileCard />
            <Box mt={10}>
                Your Programs:
            <ProgramsCarousel />
            </Box>
            <Box>
                Programs Shared with You
            <SharedProgramsCarousel />
            </Box>

            <BottomNavigation />
        </React.Fragment>
    );
}
export default withApollo({ ssr: true })(Profile)