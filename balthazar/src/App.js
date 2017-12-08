// React
import React, { Component } from 'react';

// Data
import fire from './fire';

// Own Components
import AddButton from './components/AddButton';
import AppMenu from './components/AppMenu';
import CardGrid from './components/CardGrid';
import Modal from './components/Modal';
import Filter from './components/Filter';

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
const fb = fire.database();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataOilsInit: false,
      dataTagsInit: false,
      oils: [],
      modalOpen: false,
      tags: [],
    };

    this.addOil = this.addOil.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentWillMount() {
    let oilsRef = fb.ref('oils').orderByKey().limitToLast(100);
    oilsRef.on('child_added', snapshot => {
      let oil = { text: snapshot.val(), id: snapshot.key };
      this.setState({ oils: [oil].concat(this.state.oils) });
    });
    oilsRef.once('value', snapshot => {
      let oils = [];
      console.log('Value Oils', snapshot.val());
      snapshot.forEach(snapshot => {
        oils.push({
          name: snapshot.child('name').val(),
          tags: snapshot.child('tags').val(),
        });
      });
      this.setState({ oils: oils }, () => {
        this.setState({ dataOilsInit: true });
      });
    });

    let tagsRef = fb.ref('tags').orderByKey().limitToLast(100);
    tagsRef.on('child_added', snapshot => {
      let tag = { text: snapshot.val(), id: snapshot.key };
      this.setState({ tags: [tag].concat(this.state.tags) });
    });
    tagsRef.once('value', snapshot => {
      let tags = [];
      console.log('Value Tags', snapshot.val());
      snapshot.forEach(snapshot => {
        tags.push(snapshot.val());
        console.log(snapshot.val());
      });
      this.setState({ tags: tags }, () => {
        this.setState({ dataTagsInit: true });
      });
    });

  }

  addOil(oil) {
    fire.database().ref('oils').push(oil);

    for (let i = 0, iMax = oil.tags.length; i < iMax; i += 1) {
      fire.database().ref('tags').push(oil.tags[i]);
    }

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
        { this.state.dataOilsInit && this.state.dataTagsInit &&
          <div>
            <Filter tags={this.state.tags} />
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
