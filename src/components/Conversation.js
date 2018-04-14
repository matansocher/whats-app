import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { getCircularProgress, compareDates, getLastMessageTime } from '../actions/CommonFunctions';
import _ from 'lodash';
import ConversationHeader from './ConversationHeader';
import ConversationFooter from './ConversationFooter';
import Message from './Message';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import '../css/conversation.css';

// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Conversation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }

  componentWillMount() {
    // fire.auth().onAuthStateChanged(user => {
    //   if (user) {
    //     this.props.history.push('/');
    //   } else {
    //     this.props.history.push('/SignInOrSignUp');
    //   }
    // });
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

  backToChats = () => {
    this.props.history.push('/');
  }

  contactInfoShow = () => {
    this.props.history.push('/ContactInfo');
  }

  sendMessage = (message, callback) => {
    this.setState({ loading: true }, () => {
      const sender = this.props.user.name;
      const reciever = this.props.currentChatUser.name;
      this.props.actionSendMessage(sender, reciever, message, () => {
        this.setState({ loading: false });
        callback();
      });
    });
  }

  actionDeleteMessagedeleteMessage = (message) => {
    this.setState({ loading: true }, () => {
      const sender = this.props.user.name;
      const reciever = this.props.currentChatUser.name;
      this.props.actionDeleteMessage(sender, reciever, message, () => {
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
        if (message) {
          let arrayToReturn = [];
          if(index !== messages.length - 1) { // not the last message
            if(!compareDates(message.date, messages[index+1].date)) {
              arrayToReturn.push(<div key={messages[index+1].date} className="day-indicator">
                {getLastMessageTime(messages[index+1])}
              </div>)
            }
          }
          arrayToReturn.push(<Message key={message.id} message={message}
            deleteMessage={this.deleteMessage} />);
          return arrayToReturn;
        }
        const random = Math.floor((Math.random() * 10000) + 1);
        return <span key={random} />
      })
    );
  }

  // renderMessages() {
  //   let messages = this.props.currentChatMessages;
  //   if (!messages || messages.length === 0) {
  //     return <span />
  //   }
  //   // messages = sortMessagesByDate(messages);
  //   return (
  //     messages.map(message => {
  //       if (message)
  //         return (<Message key={message.id} message={message}
  //           deleteMessage={this.deleteMessage} />);
  //       const random = Math.floor((Math.random() * 10000) + 1);
  //       return <span key={random} />
  //     })
  //   );
  // }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <div className="conversation-header">
            <ConversationHeader currentChatUser={this.props.currentChatUser}
              backToChats={this.backToChats}
              contactInfoShow={this.contactInfoShow} />
          </div>
          <div className="scrollable-conversation">
            { this.state.loading ? getCircularProgress() : <span />}
            {this.renderMessages()}
            <div style={{ float:"left", clear: "both" }}
              ref={(el) => { this.messagesEnd = el; }}>
            </div>
          </div>
          <div className="conversation-footer">
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
    user: state.user
  };
}

export default connect(mapStateToProps, actions)(Conversation);
