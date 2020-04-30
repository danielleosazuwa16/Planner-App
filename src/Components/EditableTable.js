import { FormControl, IconButton, InputLabel, MenuItem, Paper, Popover, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add, DeleteOutline, Done, SaveAltSharp, StrikethroughS } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}), {
    table: {
        "minWidth": 650
    },
});

export default function EditableTable(props) {
    const classes = useStyles();

    // Add Popover
    const [goalToAdd, setGoalToAdd] = React.useState("");
    const [addAnchorEl, setAddAnchorEl] = React.useState(null);
    const openAdd = Boolean(addAnchorEl);
    const addId = openAdd ? 'add-popover' : undefined;
    const handleClickAdd = (event) => {
        console.log("clicked")
        setAddAnchorEl(event.currentTarget);
    };

    const handleCloseAdd = () => {
        setAddAnchorEl(null);
    };

    const handleAdd = () => {
        props.handleAddGoal(goalToAdd);
        handleCloseAdd();
    }

    //Delete Popover
    const [delAnchorEl, setDelAnchorEl] = React.useState(null);
    const openDel = Boolean(delAnchorEl);
    const delId = openDel ? 'delete-popover' : undefined;
    const handleClickDel = (event) => {
        setDelAnchorEl(event.currentTarget);
    };

    const handleCloseDel = () => {
        setDelAnchorEl(null);
    };

    const [goalToDel, setGoalToDel] = React.useState('');
    const handleChangeDel = (event) => {
        setGoalToDel(event.target.value);
    };

    const deleteGoal = () => {
        props.handleDeleteGoal(goalToDel);
        // console.log(goalToDel)
        handleCloseDel();
    }

    //Complete Popover
    const [rowIndex, setRowIndex] = React.useState(0);
    const [toDoIndex, setTodoIndex] = React.useState(0);

    const handleClickCom = (event) => {
        props.handleCompleteGoal(rowIndex, toDoIndex)
    };

    const clickedText = (rowIndex, toDoIndex) => {
        setRowIndex(rowIndex);
        setTodoIndex(toDoIndex);
        console.log(rowIndex + " " + toDoIndex)
    }

    return (
        <div>
            <div align="right" >
                {/* Complete Goal */}
                <IconButton onClick={handleClickCom} >
                    <StrikethroughS />
                </IconButton>

                {/* Add Goal */}
                <IconButton aria-describedby={addId} onClick={handleClickAdd}>
                    <Add />
                </IconButton>
                <Popover
                    id={addId}
                    open={openAdd}
                    anchorEl={addAnchorEl}
                    onClose={handleCloseAdd}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}>
                    <form noValidate autoComplete="off" className={classes.formControl}>
                        <TextField
                            value={goalToAdd}
                            label="New Goal"
                            onChange={e => setGoalToAdd(e.target.value)}
                            onKeyDown={e => {
                                if (e.keyCode === 13 && e.shiftKey === false) {
                                    handleAdd()
                                }
                            }}
                        />
                        <IconButton onclick={handleAdd}>
                            <Done />
                        </IconButton>
                    </form>
                </Popover>

                {/* DeleteGoal */}
                <IconButton aria-describedby={delId} onClick={handleClickDel}>
                    <DeleteOutline />
                </IconButton>
                <Popover
                    id={delId}
                    open={openDel}
                    anchorEl={delAnchorEl}
                    onClose={handleCloseDel}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Goal</InputLabel>
                        <Select
                            value={goalToDel}
                            onChange={handleChangeDel}
                        >
                            {props.plan.headers.map(header => (
                                <MenuItem key={header} value={header}>{header}</MenuItem>
                            ))}
                        </Select>
                        <IconButton onClick={deleteGoal}>
                            <Done />
                        </IconButton>
                    </FormControl>
                </Popover>

                <IconButton onClick={props.finishPlan}>
                    <SaveAltSharp />
                </IconButton>
            </div>

            <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {props.plan.headers.map(header => (
                                <TableCell key={header} align="center">{header}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {props.plan.rows.map((row, rowIndex) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row" align="center">{row.date.toString}</TableCell>
                                {row.todos.map((v, i) =>
                                    <TableCell key={row.date.toString + i} align="center">
                                        <input
                                            className={classes.textField}
                                            value={v}
                                            onChange={e => props.editPlan(e.target.value, rowIndex, i)}
                                            onFocus={() => clickedText(rowIndex, i)}
                                            style={{
                                                textAlign: "center", border: "none",
                                                textDecoration: row.completed[i] ? 'line-through' : 'none'
                                            }}
                                            disabled={(row.completed[i] ? true: false)}
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