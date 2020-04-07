import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import React from 'react';
import { FormLabel } from '@material-ui/core';

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


export default class CreatePlanForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      planName: "",
      startDate: new Date(),
      endDate: new Date(),
      // goals: [],
      tags: [],

    }
    this.setStartDate = this.setStartDate.bind(this);
    this.setEndDate = this.setEndDate.bind(this);

  }

  setStartDate(date) {
    this.setState({ startDate: date });
  }

  setEndDate(date) {
    this.setState({ endDate: date });
  }

  render() {
    const { classes } = this.props;

    return (
      // <form className={classes.root} noValidate autoComplete="off">
      <form noValidate autoComplete="off">
        <FormLabel> Create New Plan</FormLabel>
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
              value={this.state.startDate}
              onChange={this.setStartDate}
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
              value={this.state.endDate}
              onChange={this.setEndDate}
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
        <Button variant="contained" color="primary">Create</Button>
      </form>

    );
  }
}
