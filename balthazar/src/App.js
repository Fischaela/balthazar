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

// Init Data
const fb = fire.database().ref('oils');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataInit: false,
      oils: [],
      modalOpen: false,
    };

    this.addOil = this.addOil.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentWillMount() {
    let oilsRef = fb.orderByKey().limitToLast(100);
    oilsRef.on('child_added', snapshot => {
      let oil = { text: snapshot.val(), id: snapshot.key };
      this.setState({ oils: [oil].concat(this.state.oils) });
    });
    oilsRef.once('value', snapshot => {
      let oils = [];
      console.log('Value', snapshot.val());
      snapshot.forEach(snapshot => {
        oils.push({
          name: snapshot.child('name').val(),
          tags: snapshot.child('tags').val(),
        });
      });
      this.setState({ oils: oils }, () => {
        this.setState({ dataInit: true });
      });
    });
  }

  addOil(oil) {
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
        { this.state.dataInit === true &&
          <div>
            <CardGrid oils={this.state.oils} />
            <AddButton onClick={this.toggleModal} />
            <Modal
              ref="modal"
              isOpen={this.state.modalOpen}
              handleRequestClose={this.toggleModal}
              handleRequestAdd={this.addOil}
            />
          </div>
        }
      </MuiThemeProvider>
    );
  }
}

export default App;
