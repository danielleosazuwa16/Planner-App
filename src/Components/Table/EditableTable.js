import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, InputBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { mockData } from '../../Data/Data';
import DoneIcon from '@material-ui/icons/Done';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const useStyles = makeStyles({
    table: {
        "minWidth": 650
    }
});

export default function EditableTable() {
    const classes = useStyles();
    return (
        <div>
            <Button>Add Goal</Button>
            <Button>Delete Goal</Button>
            <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {mockData.headers.map(header => (
                                <TableCell key={header} align="center">{header}</TableCell>
                            ))}
                            <TableCell align="center">Complete</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {mockData.rows.map(row => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row" align="center">{row.date.toLocaleDateString()}</TableCell>
                                {row.todos.map((v, i) =>
                                    <TableCell key={row.date.toDateString() + i} align="center">
                                        {/* <TextareaAutosize aria-label="textarea" placeholder={v} /> */}
                                        <InputBase
                                            // className={classes.input}
                                            placeholder={v}
                                            // inputProps={{ 'aria-label': 'search google maps' }}
                                        />
                                    </TableCell>
                                )}
                                <TableCell align="center">
                                    <IconButton color="inherit">
                                        <DoneIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}