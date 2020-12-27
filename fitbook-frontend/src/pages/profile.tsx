import React from 'react'
import BottomNavigation from '../components/MobileViews/BottomNavigation';
import UserProfileCard from '../components/MobileViews/UserProfileCard';
import ProgramsCarousel from '../components/ProgramsCarousel';
import { withApollo } from '../utils/withApollo';

interface ProfileProps {

}

const Profile: React.FC<ProfileProps> = ({ }) => {
    return (
        <React.Fragment>
            <UserProfileCard />
            <ProgramsCarousel />
            <BottomNavigation />
        </React.Fragment>
    );
}
export default withApollo({ ssr: true })(Profile)