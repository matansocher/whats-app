import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import fire from '../config';
import * as actions from '../actions/index';
import '../css/index.css';
import Chat from './Chat';
import List from './List';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }

  comonentWillMount() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.history.push('/');
      } else {
        this.props.history.push('/SignInOrSignUp');
      }
    });
  }

  componentDidMount() {
    if(_.isEmpty(this.props.contactList)) { // if logged in
      this.setState({ loading: true }, () => {
        this.props.fetchAllDataForUser("matan", () => {
          this.setState({ loading: false });
        });
      });
    }
  }

  render() {
    return (
      <div>
        <List />
        <Chat />
      </div>
    );
  }
}

export default connect(null, actions)(App);
