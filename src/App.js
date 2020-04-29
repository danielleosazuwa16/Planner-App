import { Container } from '@material-ui/core';
import React from 'react';
import './App.css';
import { createPlan, getRow, mockData, Plan, Row } from './Data/Data';
import Dashboard from './View/DashBoard/DashBoard';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: "Danielle Osazuwa",
      previousPlans: [],
      activePlan: mockData
    };

    if (localStorage.getItem('planSessionState') === null) {
      this.storeSession();
    } else {
      let st = localStorage.getItem('planSessionState');
      st = JSON.parse(st);
      this.state = {
        user: st.user,
        previousPlans: st.previousPlans,
        activePlan: st.activePlan
      }
    }
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
  handleDeleteGoal = (toDo: string) => {
    let i, newPlan: Plan = JSON.parse(JSON.stringify(this.state.activePlan)),
      rows: Row[] = newPlan.rows; //copy the plan
    newPlan.headers.push(toDo);

    for (i = 0; i < rows[0].todos.length; i++) {
      if (rows[0].todos[i] === toDo) {
        break;
      }
    }

    for (let j = 0; j < rows.length; j++) {
      let row = rows[j];
      row.completed.splice(i, 1);
      row.todos.splice(i, 1);
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

  handleCompleteGoal = (id: string, todo: String) => {
    let i, newPlan: Plan = JSON.parse(JSON.stringify(this.state.activePlan)),
      row = getRow(id, newPlan);

    for (i = 0; i < row.todos.length; i++) {
      if (row.todos[i] === todo) {
        row.completed[i] = true;
        break;
      }
    }

    this.setState({ activePlan: newPlan });
    this.storeSession();
  }

  handleCreatePlan = (name: String, headers: Date[], startDate: Date, endDate: Date) => {
    const newPlan: Plan = createPlan(name, startDate, endDate, headers);
    let prevActive = JSON.parse(JSON.stringify(this.state.activePlan)),
      prevPlans: Plan[] = this.state.previousPlans;
    prevPlans.push(prevActive);
    this.setState({ previousPlans: prevPlans });
    this.setState({ activePlan: newPlan });
    this.storeSession();
  }

  editPlan = (text, rowIndex, index ) => {
    const newPlan: Plan = JSON.parse(JSON.stringify(this.state.activePlan));
    newPlan.rows[rowIndex].todos[index] = text;
    console.log(newPlan.rows[rowIndex].todos[index]);
    this.setState({ activePlan: newPlan });
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
            handleCompleteDay={this.handleCompleteDay}
            handleCompleteGoal={this.handleCompleteGoal}
            handleCreatePlan={this.handleCreatePlan}
            editPlan={this.editPlan}
          />
        </Container>
      </React.Fragment>
    );
  }
}

