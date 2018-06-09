import React, { Component } from 'react';
import { makeMessageID, updateStatusInConversation } from '../actions/CommonFunctions';
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
      smileyShow: false,
      timeout: null
    }
  }

  componentDidMount() {
    // this.enterKeyListener();
  }

  enterKeyListener = () => {
    const input = document.getElementById("message");
    input.addEventListener("keydown", event => {
      // console.log(event.keyCode)
      if (event.keyCode === 13) { // 13 is the "Enter" key
        var message = this.state.message.substring(0, this.state.message.length - 1);
        console.log(message)
        this.setState({ message })
        document.getElementById("sendBtn").click();
      }
    });
  }

  onEnterPress = (e) => {
    if(e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      this.messageForm.submit();
    }
  }

  submitMessage = (e) => {
    e.preventDefault();
    this.sendMessage();
  }

  sendMessage = (e) => {
    const content = this.state.message.trim();

    if(content === '') {
      console.log('empty')
      return;
    }
    var date = new Date();
    const message = {
      id: makeMessageID(),
      content: this.state.message,
      hour: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
      date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    }
    this.props.sendMessage(message, () => {
      this.setState({ message: '' });
    });
  }

  createSetTimeout = (userid, contactid) => {
    this.setState({ timeout: setTimeout(() => {
      updateStatusInConversation(userid, contactid, false); // stopped typing
      window.clearTimeout(this.state.timeout); 
      this.setState({ timeout: null });
    } , 3000) });
  }

  updateStatus = () => {
    const { timeout } = this.state;
    const userid = this.props.user.uid;
    const contactid = this.props.currentChatUser.info.uid;
    if(timeout) {
      window.clearTimeout(timeout); 
      this.setState({ timeout: null });
    } else {
      updateStatusInConversation(userid, contactid, true); // typing
    }
    this.createSetTimeout(userid, contactid);
  }

  handleChange = (e) => {
    var change = {};
    const { value, name } = e.target;
    change[name] = value;
    this.setState(change);
    this.updateStatus(); // in order the update the status to "Typing"
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
          
          <form ref={el => this.messageForm = el} onSubmit={this.submitMessage}>
            <div className="center">
              <textarea value={this.state.message} id="message" 
                onKeyDown={this.onEnterPress}
                name="message" rows="1"
                className="form-control input-message"
                placeholder="Type a message" onChange={this.handleChange}>
              </textarea>
            </div>
            <div className="send-icon">
              <input id="sendBtn" className="pull-right" type="submit">
              <SendIcon />
              </input>
            </div>
          </form>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default ConversationFooter;


{/* <div className="center">
  <textarea value={this.state.message} id="message" 
    name="message" rows="1"
    className="form-control input-message"
    placeholder="Type a message" onChange={this.handleChange}>
  </textarea>
</div>
<div className="send-icon">
  <button id="sendBtn" className="pull-right" 
    onClick={this.sendMessage}>
    <SendIcon />
  </button>
</div> */}