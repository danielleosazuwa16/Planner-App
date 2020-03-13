import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { mockData, Plan, Row } from '../Data/Data';

const useStyles = makeStyles({
    table: {
        "minWidth": 650
    }
});

export default function PlanTable() {
    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        {mockData.headers.map(header => (
                            <TableCell key={header} align="center">{header}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {mockData.rows.map(row => (
                        <TableRow key={row.date.toString()}>
                            {console.log(row.date.toString())}
                            <TableCell component="th" scope="row" align="center">{row.date.toLocaleDateString()}</TableCell> 
                            {row.todos.map(v => 
                                <TableCell key={v} align="center">{v}</TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}