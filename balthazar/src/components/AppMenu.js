// React
import React, { Component } from 'react';

// Material UI
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

class AppMenu extends Component {
  render() {
    return (
      <AppBar>
        <Toolbar>
          <Typography type="title">
            Balthazar
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default AppMenu;
