// React
import React, { Component } from 'react';

// Material UI
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

// Styles
const styles = {
  button: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
  },
};

class AddButton extends Component {
  render() {
    return (
      <Button fab color="primary" aria-label="add" style={styles.button} onClick={this.props.onClick}>
        <AddIcon />
      </Button>
    );
  }
}

export default AddButton;
