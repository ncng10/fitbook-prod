import { Box } from '@chakra-ui/react';
import React from 'react'
import LandingPageHero from './LandingPageHero';
import LandingPageNav from './LandingPageNav';

interface LandingPageUIProps {

}

const LandingPageUI: React.FC<LandingPageUIProps> = ({ }) => {
    return (
        <React.Fragment>
            <Box
                w="100%"
                height="100vh"
                display="flex"
                flexDirection="column"
                backgroundColor="#435b5b"
                color="#F2F5FC"
                className="loginBody">
                <Box>
                    <LandingPageNav />
                    <LandingPageHero />
                </Box>
            </Box>
        </React.Fragment>
    );
}
export default LandingPageUI