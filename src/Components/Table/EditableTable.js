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

export default function EditableTable(props) {
    const classes = useStyles();
    return (
        <div>
            <Button>Add Goal</Button>
            <Button>Delete Goal</Button>
            <IconButton color="inherit">
                <DoneIcon />
            </IconButton>
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
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row" align="center">{row.date.toString}</TableCell>
                                {console.log(row.todos)}{row.todos.map((v, i) =>
                                    <TableCell key={row.date.toString + i} align="center">
                                        <InputBase
                                            align="center"
                                            placeholder={v}
                                        />
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}