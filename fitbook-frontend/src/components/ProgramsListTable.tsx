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

const useStyles = makeStyles({
    table: {
        minWidth: 200,
    },
});







export default function ProgramsListTable() {
    const classes = useStyles();
    const { data, loading } = useMyProgramsQuery();
    return (
        <TableContainer style={{ width: 1000, marginTop: 25, }} component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow >
                        <TableCell>Program Name</TableCell>
                        <TableCell align="right">Program Category</TableCell>
                        <TableCell align="right">Created</TableCell>
                        <TableCell align="right">Created By</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.myPrograms.map((row) => (
                        <TableRow key={row.programName}>
                            <TableCell component="th" scope="row">
                                {row.programName}
                            </TableCell>
                            <TableCell align="right">{row.programCategory}</TableCell>
                            <TableCell align="right">{row.creatorId}</TableCell>
                            <TableCell align="right">{row.creator.username}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    );
}
