import { Box, useMediaQuery } from '@chakra-ui/react'
import React from 'react'

interface ProgramCardProps {

}

const ProgramCard: React.FC<ProgramCardProps> = ({ }) => {
    const [isLargerThan600] = useMediaQuery("(min-width:600px)");

    return (
        <React.Fragment>
            <Box
                className="overall-swipeable-object"
                display="flex"
                flexDirection="column"
                borderRadius="15px"
            >
                <Box
                    mt={5}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    Category Here
                </Box>

                <Box
                    mt={3}
                    height={365}
                    w={310}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    backgroundColor="#fff"
                    border="1px solid lightgray "
                    borderRadius={5}
                >
                    Main Body Here
                </Box>
                {/* <Box
                    mt={3}
                    height={160}
                    borderRadius="15px"
                    w={310}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bgColor="#CCE3DE"
                >
                    Footer Description here
                </Box> */}
            </Box>
        </React.Fragment>
    );
}
export default ProgramCard