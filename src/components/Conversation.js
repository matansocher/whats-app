import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import fire from '../firebase';
import { getCircularProgress, compareDates, getChatBubbleDate, raedMessage } from '../actions/CommonFunctions';
import _ from 'lodash';
import ConversationHeader from './ConversationHeader';
import ConversationFooter from './ConversationFooter';
import Message from './Message';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';

class Conversation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gesture: false,
      gestureText: "",
      loading: false
    }
  }

  componentDidMount() {
    this.scrollToBottom();
    if (!_.isEmpty(this.props.user)) {
      const useruid = this.props.user.uid;
      const contactid = this.props.currentChatUser.info.uid;
      raedMessage(useruid, contactid);
      this.preActionFetchChatData(useruid, this.props.currentChatUser, () => {})
      // this.props.actionMarkRaedUnraed(useruid, contact, "None", () => {});
    }
  }

  preActionFetchChatData = (useruid, contact, callback) => {
    const chatData = { contact, messages: [] };
    const contactuid = contact.info.uid;
    fire.database().ref(`messages/${useruid}/${contactuid}`).on('value', messagesSnap => {
      chatData.messages = messagesSnap.val();
      this.props.actionFetchChatDataReady(chatData, callback)
    });
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
      this.props.actionDeleteContactChat(useruid, contact, () => {
        this.setState({ loading: false, gestureText: "Chat Was Deleted Successfully", gesture: true });
      });
    });
  }

  sendMessage = (message, callback) => {
    const senderuid = this.props.user.uid;
    const recieveruid = this.props.currentChatUser.info.uid;
    message.sender = senderuid;
    this.props.actionSendMessage(senderuid, recieveruid, message, () => {
      callback();
    });
  }

  deleteMessage = (message) => {
    this.setState({ loading: true }, () => {
      const senderuid = this.props.user.uid;
      const recieveruid = this.props.currentChatUser.uid;
      this.props.actionDeleteMessage(senderuid, recieveruid, message, () => {
        this.setState({ loading: false, gestureText: "Message Was Deleted Successfully", gesture: true });
      });
    });
  }

  handleRequestClose = () => {
    this.setState({ gesture: false });
  };

  renderMessages() {
    let messages = this.props.currentChatMessages;
    if (!messages || messages.length === 0) {
      return <span />
    }
    return (
      messages.map((message, index, messages) => {
        if (message && message.content !== " ") {
          let arrayToReturn = [];
          if (index !== messages.length - 1) { // not the last message
            if (!compareDates(message.date, messages[index + 1].date)) { // need to show another bubble 
              arrayToReturn.push(getChatBubbleDate(messages[index + 1]));
            }
          }
          arrayToReturn.push(
            <Message key={message.id} message={message}
              user={this.props.user} currentChatUser={this.props.currentChatUser}
              deleteMessage={this.deleteMessage} />
          );
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
          <Snackbar open={this.state.gesture} message={this.state.gestureText}
            autoHideDuration={4000} onRequestClose={this.handleRequestClose} />

          <div className="conversation-header">
            <ConversationHeader user={this.props.user}
              currentChatUser={this.props.currentChatUser}
              backToChats={this.navigateToRoute}
              contactInfoShow={this.navigateToRoute}
              deleteContactChat={this.deleteContactChat}
              navigateToRoute={this.navigateToRoute} />
          </div>

          <div id="scrollable-conversation" className="scrollable-conversation">
            {this.state.loading ? getCircularProgress() : <span />}
            {this.renderMessages()}

            <div style={{ float: "left", clear: "both" }}
              ref={(el) => { this.messagesEnd = el; }}>
            </div>
          </div>

          <div id="conversation-footer" className="conversation-footer">
            <ConversationFooter 
              user={this.props.user}
              currentChatUser={this.props.currentChatUser}
              sendMessage={this.sendMessage} />
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
    user: state.user,
    message: state.message
  };
}

export default connect(mapStateToProps, actions)(Conversation);
