import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import fire from '../config';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class ChatsHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user
    }
  }

  logout = () => {
    fire.auth().logout();
    this.props.logoutUser();
    this.props.history.push('SignInOrSignUp');
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <div className="center">
            <h1>Chats</h1>
            <div className="search-chats">
              <input className="form-control" placeholder="Search" />
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect(null, actions)(ChatsHeader);
