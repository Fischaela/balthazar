// React
import React, { Component } from 'react';

// Material UI
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

// Styles
const styles = {
  chip: {
    backgroundColor: '#37474F',
    margin: '4px',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
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

  handleClick(tag) {
    this.props.handleClick(tag);
  }

  render() {
    return (
      <div style={styles.container}>
        <FormGroup row>
          {this.props.tags.map(tag => (
          <FormControlLabel
            control={
              <Checkbox
                checked="true"
                onChange={() => this.handleClick(tag)}
                value={tag}
              />
            }
            label={tag}
						key={tag}
          />
        ))}
        </FormGroup>
      </div>
    );
  }
}

export default Filter;
