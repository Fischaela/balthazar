// React
import React, { Component } from 'react';

// Material UI
import Card, { CardContent, CardActions } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import ModeEditIcon from 'material-ui-icons/ModeEdit';

// Styles
const styles = {
  card: {
    backgroundColor: '#263238',
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
  actions: {
    justifyContent: 'flex-end',
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
        <CardActions style={styles.actions}>
          <IconButton onClick={() => {this.props.handleClick(this.props.oil)}}>
            <ModeEditIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

export default AppCard;
