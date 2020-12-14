import WorkoutListTable from "../../../components/ProgramsListTable"
import { Box, Spinner } from "@chakra-ui/react"
import React from 'react'
import { useMyProgramsQuery } from '../../../generated/graphql';
import { withApollo } from '../../../utils/withApollo';
import NextLink from "next/link"
import { NavBar } from '../../../components/NavBar';
import ProgramsListTable from "../../../components/ProgramsListTable";
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
        body =
            <ProgramsListTable />
    }
    return (
        <React.Fragment>
            <NavBar />
            <Box w="100%" display="flex" alignItems="center" justifyContent="center">
                {body}
            </Box>
        </React.Fragment>
    );
}
export default withApollo({ srr: false })(All)