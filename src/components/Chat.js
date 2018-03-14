import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions/index';
import ChatSettings from './ChatSettings';
import Message from './Message';
import InputMessage from './InputMessage';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  renderMessages() {
    const messages = this.props.chatMessages;
    const messagesArray = _.values(messages);
    return (
      messagesArray.map(message => {
        // console.log(message);
        return (<Message message={message} />)
      })
    );
  }

  render() {
    return (
      <div>
        <div className="stick-top">
          <ChatSettings currentChatUser={this.props.currentChatUser} />
        </div>
        <div className="scrollable-chat">
          {this.renderMessages()}
        </div>
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
