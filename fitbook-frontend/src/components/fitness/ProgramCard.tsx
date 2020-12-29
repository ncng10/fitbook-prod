import { Box } from '@chakra-ui/react';
import React from 'react';
import { RiGlobalLine, RiLock2Line } from 'react-icons/ri';
import { useMeQuery } from '../../generated/graphql';

interface ProgramCardProps {
    programName: string;
    creator?: string; //only programs shared with the user shows the creator. 
    programCategory: string;
    isShared: boolean;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ programCategory, programName, creator, isShared }) => {
    const { data } = useMeQuery();

    return (
        <React.Fragment>
            <Box
                className="overall-swipeable-object"
                display="flex"
                flexDirection="column"
                borderRadius="15px"
            >
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Box>
                        {!isShared ? <RiLock2Line /> : <RiGlobalLine />}
                    </Box>
                    {programCategory}
                </Box>

                <Box
                    height={200}
                    w={175}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    backgroundColor="#fff"
                    border="1px solid lightgray "
                    borderRadius={10}
                >
                    <Box>
                        <h2>{programName}</h2>
                        {creator ? <h3>Shared by: {creator}</h3> : null}
                    </Box>
                </Box>
            </Box>
        </React.Fragment>
    );
}
export default ProgramCard