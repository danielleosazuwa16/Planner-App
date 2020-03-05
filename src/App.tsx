import React from 'react';
import './App.css';
import Table from './Components/Table';
import Dashboard from './View/DashBoard/DashBoard';
import { Container } from '@material-ui/core';
import PlanTable from './Components/Table';

export default class App extends React.Component {

  render() {
    return (
      <React.Fragment>
        <Dashboard/>
      </React.Fragment>
    );
  }
}

