import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useMyProgramsQuery } from '../generated/graphql';
import { Box, Heading, IconButton, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import NextLink from "next/link"
import ProgramMenu from './ProgramMenu';

const useStyles = makeStyles({
    table: {
        minWidth: 200,
    },

});

export default function ProgramsListTable() {
    const classes = useStyles();
    const { data, loading } = useMyProgramsQuery();
    const [isLargerThan600] = useMediaQuery("(min-width:600px)")
    return (
        <Box w="100%" mt="3.5rem" display="flex" flexDirection="column">
            <VStack w="100%">
                {data?.myPrograms.map((program) => (
                    <NextLink key={program.id} href="/workout/programs/[id]" as={`/workout/programs/${program.id}`}>
                        <Box
                            w="15rem"
                            borderRadius={8}
                            h="8rem"
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                            bgColor="#f2f2f2"
                            color="#121212">
                            <Heading>{program.programName}</Heading>
                            <Text>{program.programCategory}</Text>
                            <Text>Created By: {program.creator.username}</Text>
                        </Box>
                    </NextLink>
                ))}
            </VStack>
            <Box>
                <ProgramMenu />
            </Box>
        </Box>


    );
}
