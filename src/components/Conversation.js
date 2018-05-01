import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { getCircularProgress, compareDates, getLastMessageTime } from '../actions/CommonFunctions';
import _ from 'lodash';
import ConversationHeader from './ConversationHeader';
import ConversationFooter from './ConversationFooter';
import Message from './Message';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Conversation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }

  componentDidMount() {
    if(_.isEmpty(this.props.user)) {
      this.props.history.push('/');
    }
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  navigateToRoute = (route) => {
    this.props.history.push(route);
  }

  deleteContactChat = (contact) => {
    this.setState({ loading: true }, () => {
      const useruid = this.props.user.uid;
      this.props.actionDeleteContactChat(useruid, contact.uid, () => {
        this.setState({ loading: false });
      });
    });
  }

  sendMessage = (message, callback) => {
    this.setState({ loading: true }, () => {
      const senderuid = this.props.user.uid;
      const recieveruid = this.props.currentChatUser.uid;
      this.props.actionSendMessage(senderuid, recieveruid, message, () => {
        this.setState({ loading: false });
        callback();
      });
    });
  }

  actionDeleteMessage = (message) => {
    this.setState({ loading: true }, () => {
      const senderuid = this.props.user.uid;
      const recieveruid = this.props.currentChatUser.uid;
      this.props.actionDeleteMessage(senderuid, recieveruid, message, () => {
        this.setState({ loading: false });
      });
    });
  }

  renderMessages() {
    let messages = this.props.currentChatMessages;
    if (!messages || messages.length === 0) {
      return <span />
    }
    return (
      messages.map((message, index, messages) => {
        if (message && message.content !== " ") {
          let arrayToReturn = [];
          if(index !== messages.length - 1) { // not the last message
            if(!compareDates(message.date, messages[index+1].date)) {
              let lastTime = getLastMessageTime(messages[index+1]);
              lastTime = lastTime.includes(":") ? "Toady" : lastTime;
              arrayToReturn.push(<div key={messages[index+1].date} className="day-indicator">
                {lastTime}
              </div>)
            }
          }
          arrayToReturn.push(<Message key={message.id} message={message}
            deleteMessage={this.deleteMessage} />);
          return arrayToReturn;
        }
        return <span key={1} />
      })
    );
  }

  render() {
    return (
      <MuiThemeProvider>

        <div>

          <div className="conversation-header">
            <ConversationHeader currentChatUser={this.props.currentChatUser}
              backToChats={this.navigateToRoute}
              contactInfoShow={this.navigateToRoute}
              deleteContactChat={this.deleteContactChat} />
          </div>
          <div id="scrollable-conversation" className="scrollable-conversation">
            { this.state.loading ? getCircularProgress() : <span />}
            { this.renderMessages() }

            <div style={{ float:"left", clear: "both" }}
              ref={(el) => { this.messagesEnd = el; }}>
            </div>
          </div>

          <div id="conversation-footer" className="conversation-footer">
            <ConversationFooter sendMessage={this.sendMessage} />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentChatUser: state.currentChatUser,
    currentChatMessages: state.currentChatMessages,
    // currentChat: state.currentChat,
    user: state.user,
    message: state.message
  };
}

export default connect(mapStateToProps, actions)(Conversation);
