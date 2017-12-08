// React
import React, { Component } from 'react';

// Data
import fire from './fire';

// Own Components
import AddButton from './components/AddButton';
import AppMenu from './components/AppMenu';
import CardGrid from './components/CardGrid';
import Modal from './components/Modal';

// Material UI
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import blueGrey from 'material-ui/colors/blueGrey';
import lime from 'material-ui/colors/lime';
import pink from 'material-ui/colors/pink';

// Theming
const theme = createMuiTheme({
  palette: {
    primary: blueGrey,
    secondary: lime,
    error: pink,
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      modalOpen: false,
    };

    this.addMessage = this.addMessage.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentWillMount() {
    let messagesRef = fire.database().ref('messages').orderByKey().limitToLast(100);
    messagesRef.on('child_added', snapshot => {
      let message = { text: snapshot.val(), id: snapshot.key };
      this.setState({ messages: [message].concat(this.state.messages) });
    })
  }

  addMessage(e) {
    e.preventDefault();
    fire.database().ref('messages').push( this.inputEl.value );
    this.inputEl.value = '';
  }

  toggleModal() {
    if (this.state.modalOpen === true) {
      this.setState({
        modalOpen: false,
      });
    } else {
      this.setState({
        modalOpen: true,
      });
    }
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <AppMenu />
        <CardGrid />
        <AddButton onClick={this.toggleModal} />
        <Modal isOpen={this.state.modalOpen} handleRequestClose={this.toggleModal} />
      </MuiThemeProvider>
    );
  }
}

export default App;
