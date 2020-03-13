import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { mockPlan } from '../Data/MockData';
import { Goal } from '../Data/UserSession';

//js though hmmn
// import Card from './Card/Card';
// import CardBody from './Card/CardBody';
// import CardHeader from './Card/CardHeader';

const useStyles = makeStyles({
    table: {
        "minWidth": 650
    }
    // cardCategoryWhite: {
    //     "&,& a,& a:hover,& a:focus": {
    //         color: "rgba(255,255,255,.62)",
    //         margin: "0",
    //         fontSize: "14px",
    //         marginTop: "0",
    //         marginBottom: "0"
    //     },
    //     "& a,& a:hover,& a:focus": {
    //         color: "#FFFFFF"
    //     }
    // },
    // cardTitleWhite: {
    //     color: "#FFFFFF",
    //     marginTop: "0px",
    //     minHeight: "auto",
    //     fontWeight: "300",
    //     fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    //     marginBottom: "3px",
    //     textDecoration: "none",
    //     "& small": {
    //         color: "#777",
    //         fontSize: "65%",
    //         fontWeight: "400",
    //         lineHeight: "1"
    //     }
    // }
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
                {mockPlan.data.map(row => (
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
