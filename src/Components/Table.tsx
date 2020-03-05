import React, { Component } from 'react';
import { mockPlan } from './../Data/MockData';
import { makeStyles } from '@material-ui/core/styles';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import shortid from 'shortid';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


export default function PlanTable() {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Goal</TableCell>
                        {/*TODO: Find a better way of generating a key */}
                        {mockPlan.dateRange.map(date => (
                            <TableCell key={date.toString()} align="center">{date.toLocaleDateString()}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {mockPlan.data.map(row => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">{row.name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
