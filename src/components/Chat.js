import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions/index';
import ChatSettings from './ChatSettings';
import Message from './Message';
import InputMessage from './InputMessage';
import '../css/Chat.css';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    // this.scrollToBottom();
  }

  componentDidUpdate() {
    // this.scrollToBottom();
  }

  // scrollToBottom = () => {
  //   this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  // }

  sendMessage = (message, callback) => {
    const sender = this.props.user.name;
    const reciever = this.props.currentChatUser.name;
    this.props.sendMessage(sender, reciever, message);
    callback();
  }

  deleteMessage = (message) => {
    const sender = this.props.user.name;
    const reciever = this.props.currentChatUser.name;
    this.props.deleteMessage(sender, reciever, message);
  }

  renderMessages() {
    let messages = this.props.currentChatMessages;
    if (!messages || messages.length === 0) {
      return <span />
    }
    // messages = sortMessagesByDate(messages);
    return (
      messages.map(message => {
        if (message)
          return (<Message key={message.id} message={message}
            deleteMessage={this.deleteMessage} />);
        const random = Math.floor((Math.random() * 10000) + 1);
        return <span key={random} />
      })
    );
  }

  render() {
    if(_.isEmpty(this.props.currentChatUser) || _.isEmpty(this.props.currentChatMessages)) {
      return(
        <span />
      );
    }
    return (
      <div className="chat">
        <div className="stick-top-chat">
          <ChatSettings currentChatUser={this.props.currentChatUser} />
        </div>
        <div className="scrollable-chat">
          {this.renderMessages()}
        </div>
        <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }}>
        </div>
        <div className="stick-bottom-chat">
          <InputMessage sendMessage={this.sendMessage} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentChatUser: state.currentChatUser,
    currentChatMessages: state.currentChatMessages,
    // currentChat: state.currentChat,
    user: state.user
  };
}

export default connect(mapStateToProps, actions)(Chat);
