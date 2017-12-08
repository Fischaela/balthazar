// React
import React, { Component } from 'react';

// Material UI
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';

// Styles
const styles = {
  chip: {
    margin: '4px',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '20px -4px 0',
  },
};

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTag: '',
      name: '',
      tags: [],
    };

    this.handleRequestChipDelete = this.handleRequestChipDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  addChip() {
    this.state.tags.push(this.state.currentTag);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
    if (event.keyCode === 9 || event.keyCode === 186) {
      event.preventDefault();
      this.addChip();
      this.setState({
        currentTag: '',
      });
      document.getElementById('tags').value = '';
    }
  };

  handleRequestChipDelete = data => () => {
    const tags = [...this.state.tags];
    const chipToDelete = tags.indexOf(data);
    tags.splice(chipToDelete, 1);
    this.setState({ tags });
  };

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleRequestAdd({
      name: this.state.name,
      tags: this.state.tags,
    });
  };

  render() {
    return (
      <Dialog open={this.props.isOpen} onRequestClose={this.props.handleRequestClose}>
        <DialogTitle>Add New Oil</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            onChange={this.handleChange('name')}
          />
          <TextField
            autoFocus
            margin="dense"
            id="tags"
            label="Tags"
            type="text"
            fullWidth
            onChange={this.handleChange('currentTag')}
            onKeyDown={this.handleChange('currentTag')}
          />
          <div style={styles.chips}>
            { this.state.tags.map(value => {
              return(
                <Chip
                  style={styles.chip}
                  label={value}
                  key={value}
                  onRequestDelete={this.handleRequestChipDelete(value)}
                />
              );
            })}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleSubmit} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default Modal;
