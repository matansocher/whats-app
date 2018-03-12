import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions/index';
import ListSearch from './ListSearch';
import ListSettings from './ListSettings';
import Message from './Message';
import InputMessage from './InputMessage';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  renderMessages() {

  }

  render() {
    return (
      <div className="container container-fluid">
        <div className="stick-top">
          <ListSettings currentChatUser={this.props.currentChatUser} />
        </div>
        {this.renderMessages()}
        <div className="stick-bottom">
          <InputMessage />
        </div>
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     chatMessages: state.chatMessages,
//     currentChatUser: state.currentChatUser,
//     user: state.user
//   };
// }

export default connect(null, actions)(Chat);
