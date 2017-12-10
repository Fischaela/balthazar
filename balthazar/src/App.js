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
import indigo from 'material-ui/colors/indigo';
import lime from 'material-ui/colors/lime';
import pink from 'material-ui/colors/pink';

// Theming
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      50: '#e3f2fd',
      100: '#bbdefb',
      200: '#90caf9',
      300: '#64b5f6',
      400: '#42a5f5',
      500: '#2196f3',
      600: '#1e88e5',
      700: '#1976d2',
      800: '#1565c0',
      900: '#0d47a1',
      A100: '#82b1ff',
      A200: '#448aff',
      A400: '#2979ff',
      A700: '#2962ff',
      contrastDefaultColor: 'light',
    },
    secondary: {
      50: '#e3f2fd',
      100: '#bbdefb',
      200: '#90caf9',
      300: '#64b5f6',
      400: '#42a5f5',
      500: '#2196f3',
      600: '#1e88e5',
      700: '#1976d2',
      800: '#1565c0',
      900: '#0d47a1',
      A100: '#82b1ff',
      A200: '#448aff',
      A400: '#2979ff',
      A700: '#2962ff',
      contrastDefaultColor: 'light',
    },
    error: {
      50: '#e3f2fd',
      100: '#bbdefb',
      200: '#90caf9',
      300: '#64b5f6',
      400: '#42a5f5',
      500: '#2196f3',
      600: '#1e88e5',
      700: '#1976d2',
      800: '#1565c0',
      900: '#0d47a1',
      A100: '#82b1ff',
      A200: '#448aff',
      A400: '#2979ff',
      A700: '#2962ff',
      contrastDefaultColor: 'light',
    },
  },
});

// Init Data
const fb = fire.database();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataOilsInit: false,
      oils: [],
      filteredOils: [],
      modalOpen: false,
      tags: [],
    };

    this.addOil = this.addOil.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.filterView = this.filterView.bind(this);
  }

  componentWillMount() {
    let oilsRef = fb.ref('oils').orderByKey().limitToLast(100);
    oilsRef.on('child_added', snapshot => {
      let oil = { text: snapshot.val(), id: snapshot.key };
      this.setState({ oils: [oil].concat(this.state.oils) });
    });
    oilsRef.once('value', snapshot => {
      let oils = [];
      let tags = [];
      console.log('Value Oils', snapshot.val());
      snapshot.forEach(snapshot => {
        oils.push({
          name: snapshot.child('name').val(),
          tags: snapshot.child('tags').val(),
        });
      });
      tags = this.getTagsFromOils(oils);
      this.setState({
        oils: oils,
        filteredOils: oils,
        tags: tags,
      }, () => {
        this.setState({ dataOilsInit: true });
      });
    });
  }

  addOil(oil) {
    fire.database().ref('oils').push(oil);
    this.toggleModal();
  }

  filterView(tag) {
    console.log('Tag Click', tag);
    const oils = this.state.oils;
    let filteredOils = [];

    for (let i = 0, iMax = oils.length; i < iMax; i += 1) {
      if (oils[i].tags) {
        for (let j = 0, jMax = oils[i].tags.length; j < jMax; j += 1) {
          if (oils[i].tags[j] === tag) {
            filteredOils.push(oils[i]);
          }
        }
      }
    }

    filteredOils = filteredOils.filter(function(elem, index, self) {
      return index == self.indexOf(elem);
    });

    this.setState({
      filteredOils: filteredOils,
    });
  }

  getTagsFromOils(oils) {
    let tags = [];

    for (let i = 0, iMax = oils.length; i < iMax; i += 1) {
      if (oils[i].tags) {
        for (let j = 0, jMax = oils[i].tags.length; j < jMax; j += 1) {
          tags.push(oils[i].tags[j]);
        }
      }
    }
    tags = tags.filter(function(elem, index, self) {
      return index == self.indexOf(elem);
    });

    console.log('Tags', tags);
    return tags;
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
        { this.state.dataOilsInit &&
          <div>
            <Filter tags={this.state.tags} handleClick={this.filterView}/>
            <CardGrid oils={this.state.filteredOils} />
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
