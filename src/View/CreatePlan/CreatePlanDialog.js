import DateFnsUtils from '@date-io/date-fns';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
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
    }),
);

export default function CreatePlanDialog() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [startDate, setSelectedStartDate] = React.useState(new Date());
    const [endDate, setSelectedEndDate] = React.useState(new Date());

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const setStartDate = date => {
        setSelectedStartDate(date);
    }

    const setEndDate = date => {
        setSelectedEndDate(date);
    }

    return (
        <div>
            <ListItem button onClick={handleClickOpen}>
                <ListItemIcon>
                    <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Create New Plan" />
            </ListItem>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id='form-dialog-title'>Create New Plan</DialogTitle>
                <DialogContent>
                    <form className={classes.root} noValidate autoComplete="off">
                        <Grid item>
                            <TextField required id="plan-name" label="Plan Name" defaultValue="" />
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
                        <Grid>
                            <TextField id="goal-textfield" label="New Goal" />
                            <Button variant="contained" color="primary"> Add Goal </Button>
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleClose} color="primary">Cancel</Button>
                    <Button variant="contained" onClick={handleClose} color="primary">Create</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}