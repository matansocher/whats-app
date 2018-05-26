import React, { Component } from 'react';
import { makeMessageID } from '../actions/CommonFunctions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SmileyIcon from 'material-ui/svg-icons/social/mood';
import SendIcon from 'material-ui/svg-icons/content/send';

import '../css/conversation.css';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { Emoji } from 'emoji-mart';

class ConversationFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      smileyShow: false
    }
  }

  sendMessage = () => {
    var date = new Date();
    const message = {
      id: makeMessageID(),
      content: this.state.message,
      hour: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
      date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    }
    this.props.sendMessage(message, () => {
      this.refs.message.value = '';
      this.setState({ message: '' });
    });
  }

  handleChange = (e) => {
    var change = {};
    const { value, name } = e.target;
    change[name] = value;
    this.setState(change);
  }

  toggleSmiley = () => {
    // document.getElementById("scrollable-conversation").classList.toggle('scrollable-conversation-short');
    // document.getElementById("conversation-footer").classList.toggle('conversation-footer-long');
    // this.setState({ smileyShow: !this.state.smileyShow });
  }

  returnEmoji = (id) => {
    return (
      <span dangerouslySetInnerHTML={{
        __html: Emoji({
          html: true, set: 'apple', emoji: { id }, size: 20
        })
      }}></span>
    );
    // <Emoji emoji={{ id: {id}, skin: 3 }} size={20} />
  }

  addEmojiToMessage = (emoji) => {
    console.log(emoji);
    let { message } = this.state;
    message += this.returnEmoji(emoji.id);
    this.setState({ message });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          {this.state.smileyShow ?
            <Picker onSelect={this.addEmojiToMessage}
              style={{ position: 'relative', width: '100%' }} />
            : <span />}
          <div className="smiley">
            <SmileyIcon onClick={this.toggleSmiley} className="pull-left" />
          </div>
          <div className="center">
            <textarea value={this.state.message} name="message" ref="message"
              className="form-control input-message" rows="1"
              placeholder="Type a message" onChange={this.handleChange}>
            </textarea>
          </div>
          <div className="send-icon">
            <SendIcon className="pull-right" onClick={this.sendMessage} />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default ConversationFooter;
