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
      oils: [],
      modalOpen: false,
    };

    this.addOil = this.addOil.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentWillMount() {
    let oilsRef = fire.database().ref('oils').orderByKey().limitToLast(100);
    oilsRef.on('child_added', snapshot => {
      let oil = { text: snapshot.val(), id: snapshot.key };
      this.setState({ oils: [oil].concat(this.state.oils) });
    })
  }

  addOil(oil) {
    console.log(oil);
    fire.database().ref('oils').push(oil);
    this.toggleModal();
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
        <Modal
          ref="modal"
          isOpen={this.state.modalOpen}
          handleRequestClose={this.toggleModal}
          handleRequestAdd={this.addOil}
        />
      </MuiThemeProvider>
    );
  }
}

export default App;
