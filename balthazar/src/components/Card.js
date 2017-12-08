// React
import React, { Component } from 'react';

// Material UI
import Card, { CardContent } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import Typography from 'material-ui/Typography';

// Styles
const styles = {
  card: {
    maxWidth: '250px',
  },
  chip: {
    margin: '4px',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  headline: {
    marginBottom: '10px',
  },
};

class CardGrid extends Component {
  render() {
    return (
      <Card style={styles.card}>
        <CardContent>
          <Typography type="headline" component="h2" style={styles.headline}>
            Lavender
          </Typography>
          <div style={styles.chips}>
            <Chip label="Basic Chip" style={styles.chip}/>
            <Chip label="Basic Chip" style={styles.chip}/>
            <Chip label="Basic Chip" style={styles.chip}/>
            <Chip label="Basic Chip" style={styles.chip}/>
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default CardGrid;
