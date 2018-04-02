import React, { Component } from 'react';
import _ from 'lodash';
// import fire from '../firebase';
import Chats from './Chats';
import Conversation from './Conversation';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as actions from '../actions/index';
import '../css/index.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <Chats />
      </MuiThemeProvider>
    );
  }
}

export default App;
