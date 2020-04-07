import React from 'react';
import './App.css';
import Dashboard from './View/DashBoard/DashBoard';
import { mockSession } from './Data/Data';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: "",
      previousPlans: [],
      activePlan: {}
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
    console.log(st)
    this.state = {
      user: st.user,
      previousPlans: st.previousPlans,
      activePlan: st.activePlan
    }
  }

  handleAddGoal = (goal: string) => {

  }

  handleDeleteGoal = () => {

  }

  handleCompleteDay = () => {

  }

  render() {
    return (
      <React.Fragment>
        <Dashboard
          user={this.state.user}
          previousPlans={this.state.previousPlans}
          activePlan={this.state.activePlan}
        />
      </React.Fragment>
    );
  }
}

