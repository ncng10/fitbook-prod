import { Box } from '@chakra-ui/react';
import React from 'react'

interface AuthFlowCardProps {

}

const AuthFlowCard: React.FC<AuthFlowCardProps> = ({ ...props }) => {
    return (
        <React.Fragment>
            <Box
                w="100%"
                height="100vh"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                backgroundColor="#435b5b"
                color="#6A6B6D"
                className="loginBody">
                <Box
                    backgroundColor="#FFFFFF"
                    display="flex"
                    align-items="center"
                    justify-content="center"
                    flexDirection="column"
                    width={350}
                    height={450}
                    borderRadius={25}
                    className="loginCard"
                >
                    {props.children}
                </Box>
            </Box>
        </React.Fragment>
    );
}
export default AuthFlowCard