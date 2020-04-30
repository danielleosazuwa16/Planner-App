import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles({
    table: {
        "minWidth": 650
    }
});

export default function PlanTable(props) {
    const classes = useStyles();
    return (
        <TableContainer>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        {props.plan.headers.map(header => (
                            <TableCell key={header} align="center">{header}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {props.plan.rows.map((row, i) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row" align="center">{row.date.toString}</TableCell>
                            {row.todos.map((v, i) =>
                                <TableCell
                                    key={row.date.toString + i}
                                    align="center"
                                    style={{
                                        textDecoration: row.completed[i] ? 'line-through' : 'none'
                                    }}> {v}
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}