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
import RemoveFilterButton from './components/RemoveFilterButton';

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
      50: '#FCE4EC',
      100: '#F8BBD0',
      200: '#F48FB1',
      300: '#F06292',
      400: '#EC407A',
      500: '#E91E63',
      600: '#D81B60',
      700: '#C2185B',
      800: '#AD1457',
      900: '#880E4F',
      A100: '#FF80AB',
      A200: '#FF4081',
      A400: '#F50057',
      A700: '#C51162',
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

const styles = {
  wrapper: {
    backgroundColor: '#455A64',
  },
};

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
      modalNameValue: '',
      modalTags: [],
      tags: [],
      activeTags: [],
    };

    this.addOil = this.addOil.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.filterView = this.filterView.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
    this.handleCardEdit = this.handleCardEdit.bind(this);
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
      snapshot.forEach(snapshot => {
        oils.push({
          name: snapshot.child('name').val(),
          tags: snapshot.child('tags').val(),
          id: snapshot.key,
        });
      });
      oils.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
      });
      tags = this.getTagsFromOils(oils);
      tags.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
      });
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
    const oils = this.state.oils;
    const tags = this.state.tags;
    let newTags = [];
    let activeTags = this.state.activeTags;
    let filteredOils = [];

    if (tag.checked === false || activeTags.length === 0) {
      activeTags.push(tag.name);
    } else {
      let index = activeTags.indexOf(tag.name);
      activeTags.splice(index, 1);
    }

    // get a new array with filtered oils
    for (let i = 0, iMax = oils.length; i < iMax; i += 1) {
      if (oils[i].tags) {
        for (let j = 0, jMax = oils[i].tags.length; j < jMax; j += 1) {
          for (let k = 0, kMax = activeTags.length; k < kMax; k += 1) {
            if (oils[i].tags[j] === activeTags[k]) {
              filteredOils.push(oils[i]);
            }
          }
        }
      }
    }

    filteredOils = filteredOils.filter(function(elem, index, self) {
      return index == self.indexOf(elem);
    });

    // get a new array with tags
    for (let i = 0, iMax = tags.length; i < iMax; i += 1) {

      if (activeTags.includes(tags[i].name)) {
        newTags.push({
          name: tags[i].name,
          checked: true,
        });
      } else {
        newTags.push({
          name: tags[i].name,
          checked: false,
        });
      }
    }

    newTags = new Set(newTags.map(e => JSON.stringify(e)));
    newTags = Array.from(newTags).map(e => JSON.parse(e));

    this.setState({
      activeTags: activeTags,
      filteredOils: filteredOils,
      tags: newTags,
    });
  }

  getTagsFromOils(oils) {
    let tags = [];

    for (let i = 0, iMax = oils.length; i < iMax; i += 1) {
      if (oils[i].tags) {
        for (let j = 0, jMax = oils[i].tags.length; j < jMax; j += 1) {
          tags.push({
            name: oils[i].tags[j],
            checked: true,
          });
        }
      }
    }
    tags = new Set(tags.map(e => JSON.stringify(e)));
    tags = Array.from(tags).map(e => JSON.parse(e));
    return tags;
  }

  handleCardEdit(oil) {
    console.log('Edit', oil);
  }

  removeFilter() {
    let tags = this.state.tags;
    let newTags = [];

    for (let i = 0, iMax = tags.length; i < iMax; i += 1) {
      newTags.push({
        name: tags[i].name,
        checked: true,
      });
    }
    this.setState({
      filteredOils: this.state.oils,
      activeTags: this.state.tags,
      tags: newTags,
    });
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
          <div  style={styles.wrapper}>
            <Filter tags={this.state.tags} handleClick={this.filterView} />
            <RemoveFilterButton handleClick={this.removeFilter} />
            <CardGrid oils={this.state.filteredOils} handleClick={this.handleCardEdit}/>
            <AddButton onClick={this.toggleModal} />
            <Modal
              ref=".modal"
              isOpen={this.state.modalOpen}
              handleRequestClose={this.toggleModal}
              handleRequestAdd={this.addOil}
              name={this.state.modalNameValue}
              tags={this.state.modalTags}
            />
          </div>
        }
      </MuiThemeProvider>
    );
  }
}

export default App;
