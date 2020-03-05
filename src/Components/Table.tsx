import React, { Component } from 'react';
import { mockPlan } from './../Data/MockData';
import { makeStyles } from '@material-ui/core/styles';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import shortid from 'shortid';
import { Goal } from '../Data/UserSession';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function getPlanFor(date: Date, goal: Goal): string {
    //make this more javascript ish
    //extract later to some other place
    for (let i = 0; i < goal.plan.length; i++) {
        if (goal.plan[i].date === date) {
            return goal.plan[i].toDo
        }
    }
    return "";
}

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
                    {mockPlan.data.map((row, index, goals) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row" align="center">{row.name}</TableCell>
                            {mockPlan.dateRange.map(date => (
                                <TableCell key={date.toString()} align="center"> {getPlanFor(date, row)}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
