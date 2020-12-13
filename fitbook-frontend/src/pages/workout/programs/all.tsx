import { Box, Spinner } from '@chakra-ui/react';
import React from 'react'
import { useMyProgramsQuery } from '../../../generated/graphql';
import { withApollo } from '../../../utils/withApollo';

interface AllProps {

}

const All: React.FC<AllProps> = ({ }) => {
    const { data, loading } = useMyProgramsQuery();
    let body;
    if (!data) {
        body = <Box>No programs, try adding one...</Box>
    } else if (loading) {
        body = <Box> <Spinner color="teal.500" /></Box>
    } else {
        body = <Box> {data?.myPrograms.map((program) => (
            program.programName
        ))}</Box>
    }
    return (
        <React.Fragment>
            {body}
        </React.Fragment>
    );
}
export default withApollo({ srr: false })(All)