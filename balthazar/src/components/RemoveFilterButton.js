// React
import React, { Component } from 'react';

// Material UI
import Button from 'material-ui/Button';

// Styles
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    margin: '0 auto',
    padding: '20px 40px 0',
    width: '100%',
    maxWidth: '900px',
  },
};

class RemoveFilterButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={styles.container}>
        <Button color="primary" onClick={this.props.handleClick}>
          Remove Filter
        </Button>
      </div>
    );
  }
}

export default RemoveFilterButton;
