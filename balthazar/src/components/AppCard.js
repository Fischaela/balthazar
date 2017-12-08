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

class AppCard extends Component {
  render() {
    return (
      <Card style={styles.card}>
        <CardContent>
          <Typography type="headline" component="h2" style={styles.headline}>
            {this.props.oil.name}
          </Typography>
          <div style={styles.chips}>
          {this.props.oil.tags.map(tag => (
            <Chip label={tag} style={styles.chip} key={tag}/>
          ))}
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default AppCard;
