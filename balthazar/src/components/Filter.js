// React
import React, { Component } from 'react';

// Material UI
import Chip from 'material-ui/Chip';

// Styles
const styles = {
  chip: {
    margin: '4px',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0 auto',
    padding: '100px 40px 0',
    width: '100%',
    maxWidth: '900px',
  },
};

class Filter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={styles.container}>
           <Chip label="test" style={styles.chip} key="test"/>
      </div>
    );
  }
}

export default Filter;
