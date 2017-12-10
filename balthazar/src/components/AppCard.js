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
    backgroundColor: '#37474F',
    margin: '4px',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  content: {
    backgroundColor: '#263238',
  },
  headline: {
    marginBottom: '10px',
  },
};

class AppCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card style={styles.card}>
        <CardContent style={styles.content}>
          <Typography type="headline" component="h2" style={styles.headline}>
            {this.props.oil.name}
          </Typography>
          <div style={styles.chips}>
            {this.props.oil.tags && this.props.oil.tags.map(tag => (
              <Chip label={tag} style={styles.chip} key={tag}/>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default AppCard;
