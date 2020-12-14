import { Box, IconButton } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react'
import { AiOutlineEye } from 'react-icons/ai';
import WorkoutModal from '../../../components/WorkoutModal';
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
                Workoout Date :12/13/2020yarn add @chakra-ui/table

                <WorkoutModal />
            </Box>
        </React.Fragment>
    );
}
export default withApollo({ ssr: false })(Program)