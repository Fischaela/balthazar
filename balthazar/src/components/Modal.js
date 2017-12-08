// React
import React, { Component } from 'react';

// Material UI
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

class Modal extends Component {
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.props.handleRequestClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default Modal;
