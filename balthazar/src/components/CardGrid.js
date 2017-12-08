// React
import React, { Component } from 'react';

// Own Components
import Card from './Card';

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
        {[0, 1, 2].map(value => (
          <Grid key={value} item>
            <Card />
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default CardGrid;
