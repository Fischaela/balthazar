// React
import React, { Component } from 'react';

// Material UI
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const styles = {
  toolbar: {
    backgroundColor: '#263238',
  },
};

class AppMenu extends Component {
  render() {
    return (
      <AppBar>
        <Toolbar style={styles.toolbar}>
          <Typography type="title">
            Balthazar
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default AppMenu;
