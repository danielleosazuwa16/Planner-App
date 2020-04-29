import DateFnsUtils from '@date-io/date-fns';
import { Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Add, Close, Create, Done } from '@material-ui/icons';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: 200,
            },
        },
        chipStyle: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            listStyle: 'none',
            padding: theme.spacing(0.5),
            margin: 0,
        },
        chip: {
            margin: theme.spacing(0.5),
        },
    }),
);

function useForceUpdate() {
    const [value, setValue] = React.useState(0); 
    return () => setValue(value => ++value);
}


export default function CreatePlanDialog(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState("");
    const [goals, setGoals] = React.useState([]);
    const [goal, setGoal] = React.useState("");
    const [startDate, setSelectedStartDate] = React.useState(new Date());
    const [endDate, setSelectedEndDate] = React.useState(new Date());
    const forceUpdate = useForceUpdate();

    const handleDelete = (chipToDelete, i) => () => {
        const g = Object.assign(goals);
        g.splice(i, 1);
        setGoals(g);
        forceUpdate();
    };

    const addGoal = () => {
        const g = Object.assign(goals);
        g.push(goal);
        setGoals(g);
        setGoal("");
        console.log(goals)
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCreate = () => {
        props.createPlan(name, goals, startDate, endDate);
        handleClose();
    }

    const setStartDate = date => {
        setSelectedStartDate(date);
    }

    const setEndDate = date => {
        setSelectedEndDate(date);
    }



    return (
        <div>
            <IconButton color="inherit" onClick={handleClickOpen}>
                <Create />
            </IconButton>
            <Divider />
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id='form-dialog-title'>Create New Plan</DialogTitle>
                <DialogContent>
                    <form className={classes.root} noValidate autoComplete="off">
                        <Grid item>
                            <TextField
                                id="plan-name"
                                label="Plan Name"
                                value={name}
                                onChange={e => setName(e.target.value)} />
                        </Grid>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="start-date-picker"
                                    label="Start Date"
                                    value={startDate}
                                    onChange={setStartDate}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change start date',
                                    }}
                                />
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="end-date-picker"
                                    label="End Date"
                                    value={endDate}
                                    onChange={setEndDate}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change end date',
                                    }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>

                        <div component="ul" className={classes.chipStyle}>
                            {goals.map((data, i) => {
                                return (
                                    <li key={i}>
                                        <Chip
                                            label={data}
                                            onDelete={handleDelete(data, i)}
                                            className={classes.chip}
                                        />
                                    </li>
                                );
                            })}
                        </div>

                        <Grid>
                            <TextField id="goalTextfield"
                                label="Add Goal"
                                value={goal}
                                onChange={e => setGoal(e.target.value)}
                                onKeyDown={e => {
                                    if (e.keyCode === 13 && e.shiftKey === false) {
                                        addGoal()
                                    }
                                }} />
                            <IconButton onClick={() => addGoal()}>
                                <Add />
                            </IconButton>
                        </Grid>

                    </form>

                </DialogContent>
                <DialogActions>
                    <IconButton onClick={handleClose}>
                        <Close />
                    </IconButton>
                    <IconButton onClick={handleCreate}>
                        <Done />
                    </IconButton>
                </DialogActions>
            </Dialog>
        </div>
    );
}