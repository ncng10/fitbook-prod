import { Box, Button } from '@chakra-ui/react'
import React from 'react'
import { NavBar } from '../components/NavBar'
import { withApollo } from '../utils/withApollo';

interface dashboardProps {

}

const Dashboard: React.FC<dashboardProps> = ({ }) => {
    return (
        <React.Fragment>
            <NavBar />
        </React.Fragment>);
}
export default withApollo({ ssr: false })(Dashboard)