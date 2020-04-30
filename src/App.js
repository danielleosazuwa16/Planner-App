import { Container } from '@material-ui/core';
import React from 'react';
import './App.css';
import { createPlan, getRow, mockData, Plan, Row } from './Data/Data';
import Dashboard from './View/DashBoard';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: "Danielle Osazuwa",
      previousPlans: [mockData],
      activePlan: mockData
    };

    // if (localStorage.getItem('planSessionState') === null) {
    //   this.storeSession();
    // } else {
    //   let st = localStorage.getItem('planSessionState');
    //   st = JSON.parse(st);
    //   this.state = {
    //     user: st.user,
    //     previousPlans: st.previousPlans,
    //     activePlan: st.activePlan
    //   }
    // }
  }

  storeSession = () => {
    localStorage.setItem('planSessionState', JSON.stringify(this.state));
  }

  /**
   * 
   */
  handleAddGoal = (toDo: string) => {
    let newPlan: Plan = JSON.parse(JSON.stringify(this.state.activePlan)),
      rows: Row[] = newPlan.rows; //copy the plan
    newPlan.headers.push(toDo);

    for (let i = 0; i < rows.length; i++) {
      rows[i].completed.push(false);
      rows[i].todos.push("");
    }

    this.setState({ activePlan: newPlan });
    this.storeSession();
  }

  /**
   * 
   */
  handleDeleteGoal = (goal: string) => {
    let i, newPlan: Plan = JSON.parse(JSON.stringify(this.state.activePlan));
    console.log(newPlan)
    for (i = 0; i < newPlan.headers.length; i++) {
      if (newPlan.headers[i] === goal) {
        newPlan.headers.splice(i, 1);
        break;
      }
    }

    for (let j = 0; j < newPlan.rows.length; j++) {
      newPlan.rows[j].completed.splice(i, 1);
      newPlan.rows[j].todos.splice(i, 1);
    }



    this.setState({ activePlan: newPlan });
    this.storeSession();
  }

  handleCompleteDay = (id: string) => {
    let newPlan: Plan = JSON.parse(JSON.stringify(this.state.activePlan)),
      row = getRow(id, newPlan);

    for (let i = 0; i < row.completed.length; i++) {
      row.completed[i] = true;
    }

    this.setState({ activePlan: newPlan });
    this.storeSession();
  }

  handleCompleteGoal = (rowIndex, toDoIndex) => {
    let newPlan: Plan = JSON.parse(JSON.stringify(this.state.activePlan));
    newPlan.rows[rowIndex].completed[toDoIndex] = true;

    this.setState({ activePlan: newPlan });
    this.storeSession();
  }

  handleCreatePlan = (name: String, headers: Date[], startDate: Date, endDate: Date) => {
    headers.unshift("Date");
    const newPlan: Plan = createPlan(name, startDate, endDate, headers);
    let prevActive = JSON.parse(JSON.stringify(this.state.activePlan)),
      prevPlans: Plan[] = this.state.previousPlans;
    prevPlans.push(prevActive);
    this.setState({ previousPlans: prevPlans });
    this.setState({ activePlan: newPlan });
    this.storeSession();
  }

  editPlan = (text, rowIndex, index) => {
    const newPlan: Plan = JSON.parse(JSON.stringify(this.state.activePlan));
    newPlan.rows[rowIndex].todos[index] = text;
    this.setState({ activePlan: newPlan });
    this.storeSession();
  }

  finishPlan = () => {
    let s = JSON.parse(JSON.stringify(this.state.previousPlans));
    s.push(this.state.activePlan);
    this.setState({
      activePlan: false,
      previousPlans: s,
    });
    this.storeSession();
  }

  render() {
    return (
      <React.Fragment>
        <Container>
          <Dashboard
            user={this.state.user}
            previousPlans={this.state.previousPlans}
            plan={this.state.activePlan}
            handleAddGoal={this.handleAddGoal}
            handleDeleteGoal={this.handleDeleteGoal}
            handleCompleteGoal={this.handleCompleteGoal}
            handleCreatePlan={this.handleCreatePlan}
            editPlan={this.editPlan}
            finishPlan={this.finishPlan}
          />
        </Container>
      </React.Fragment>
    );
  }
}

