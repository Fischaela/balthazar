// React
import React, { Component } from 'react';

// Own Components
import AppCard from './AppCard';

// Material UI
import Grid from 'material-ui/Grid';

// Styles
const styles = {
  container: {
    justifyContent: 'center',
    margin: '0 auto',
    padding: '100px 40px',
    width: '100%',
    maxWidth: '1600px',
  },
};

class CardGrid extends Component {
  render() {
    return (
      <Grid container style={styles.container}>
        {this.props.oils.map(oil => (
          <Grid key={oil.id} item>
            <AppCard oil={oil} handleClick={this.props.handleClick} loggedIn={this.props.loggedIn} />
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default CardGrid;
