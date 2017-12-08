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
    console.log('Adding Chip: ', this.state.currentTag);
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
    console.log(this.state);
  };

  handleRequestChipDelete = data => () => {
    const tags = [...this.state.tags];
    const chipToDelete = tags.indexOf(data);
    tags.splice(chipToDelete, 1);
    this.setState({ tags });
  };

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleRequestAdd(this.state.name);
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
          { this.state.tags.map(value => {
            return(
              <Chip
                label={value}
                key={value}
                onRequestDelete={this.handleRequestChipDelete(value)}
              />
            );
          })}
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
