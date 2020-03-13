import React from 'react';
import './App.css';
import Dashboard from './View/DashBoard/DashBoard';

export default class App extends React.Component {

  render() {
    return (
      <React.Fragment>
        <Dashboard />
        {/* <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab> */}
      </React.Fragment>
    );
  }
}

