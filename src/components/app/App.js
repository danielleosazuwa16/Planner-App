import React from 'react';
import MenuBar from '../MenuBar/MenuBar';
import Divider from '@material-ui/core/Divider';
import { Card } from '@material-ui/core';

function App() {
  return (
    <React.Fragment>
      <MenuBar></MenuBar>
      <Divider variant="middle"/>
    </React.Fragment>
  );
}

export default App;
