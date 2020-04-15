import React from 'react';
import './App.css';
import Dashboard from './View/DashBoard/DashBoard';
import { Plan, Row, mockSession, mockData, createPlan, getRow, createSimpleDate } from './Data/Data';
import shortid from 'shortid';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: "Danielle Osazuwa",
      previousPlans: [],
      activePlan: mockData
    };

    //this.storeSession(mockSession)

    if (this.hasSaves) {
      this.getSession()
    } else {
      this.storeSession(mockSession)
    }
  }

  hasSaves = () => {
    if (localStorage.getItem('planSessionState') === null) {
      return false;
    } return true;
  }

  storeSession = (data) => {
    localStorage.setItem('planSessionState', JSON.stringify(data));
  }

  getSession = () => {
    let st = localStorage.getItem('planSessionState');
    st = JSON.parse(st);
    console.log(st);
    this.state = {
      user: st.user,
      previousPlans: st.previousPlans,
      activePlan: st.activePlan
    }
  }

  /**
   * 
   */
  handleAddGoal = (toDo: string, d: Date) => {
    let newPlan: Plan = JSON.parse(JSON.stringify(this.state.activePlan)),
      rows: Row[] = newPlan.rows; //copy the plan
    newPlan.headers.push(toDo);

    for (let i = 0; i < rows.length; i++) {
      rows[i].completed.push(false);
      rows[i].todos.push("");
    }

    this.setState(activePlan: newPlan);
  }

  /**
   * 
   */
  handleDeleteGoal = (goal: string) => {
    let i, newPlan: Plan = JSON.parse(JSON.stringify(this.state.activePlan)),
      rows: Row[] = newPlan.rows; //copy the plan
    newPlan.headers.push(toDo);

    for (i = 0; i < rows[0].todos.length; i++) {
      if (rows[0].todos[] == goal) {
        break;
      }
    }

    for (let j = 0; j < rows.length; j++) {
      let row = rows[j];
      row.completed.splice(i, 1);
      row.todos.splice(i, 1);
    }

    this.setState(activePlan: newPlan);
  }

  handleCompleteDay = (id: string) => {
    let newPlan: Plan = JSON.parse(JSON.stringify(this.state.activePlan)),
      row = getRow(id, newPlan);

    for (let i = 0; i < row.completed.length; i++) {
      row.completed[i] = true;
    }

    this.setState(activePlan: newPlan);
  }

  handleCompleteGoal = (id: string, todo: String) => {
    let i, newPlan: Plan = JSON.parse(JSON.stringify(this.state.activePlan)),
      row = getRow(id, newPlan);

    for (i = 0; i < row.todos.length; i++) {
      if (row.todos[i] == goal) {
        row.completed[i] = true;
        break;
      }
    }

    this.setState(activePlan: newPlan);
  }

  handleCreatePlan = (name: String, headers: Date[], startDate: Date, endDate: Date) => {
    const newPlan: Plan = createPlan(name, startDate, endDate, headers);
    let prevActive = JSON.parse(JSON.stringify(this.state.activePlan)),
      prevPlans: Plan[] = this.state.previousPlans;
    prevPlans.push(prevActive);
    this.setState({ previousPlans: prevPlans });
    this.setState({ activePlan: newPlan });
  }

  render() {
    return (
      <React.Fragment>
        <Dashboard
          user={this.state.user}
          previousPlans={this.state.previousPlans}
          activePlan={this.state.activePlan}
          handleAddGoal={this.handleAddGoal}
          handleDeleteGoal={this.handleDeleteGoal}
          handleCompleteDay={this.handleCompleteDay}
          handleCompleteGoal={this.handleCompleteGoal}
          handleCreatePlan={this.handleCreatePlan}
        />
      </React.Fragment>
    );
  }
}

