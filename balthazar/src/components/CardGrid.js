// React
import React, { Component } from 'react';

// Own Components
import AppCard from './AppCard';

// Material UI
import Grid from 'material-ui/Grid';

// Styles
const styles = {
  container: {
    margin: '0 auto',
    padding: '100px 40px',
    width: '100%',
    maxWidth: '900px',
  },
};

class CardGrid extends Component {
  render() {
    return (
      <Grid container style={styles.container}>
        {this.props.oils.map(oil => (
          <Grid key={oil.name} item>
            <AppCard oil={oil} />
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default CardGrid;
