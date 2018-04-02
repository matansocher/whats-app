import React, { Component } from 'react';
import { makeMessageID } from '../actions/CommonFunctions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SmileyIcon from 'material-ui/svg-icons/social/mood';
import RecordIcon from 'material-ui/svg-icons/av/mic';
import SendIcon from 'material-ui/svg-icons/content/send';

class ConversationFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      empty: true
    }
  }

  sendMessage = () => {
    var date = new Date();
    const message = {
      id: makeMessageID(),
      content: this.state.message,
      hour: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
      date: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    }
    this.props.sendMessage(message, () => {
      this.setState({ message: '' });
    });
  }

  handleChange = (e) => {
    var change = {};
    const { value, name } = e.target;
    change[name] = value;
    this.setState(change);
    if (!value || value.length === 0 || value === '') {
      this.setState({ empty: true });
    } else {
      this.setState({ empty: false });
    }
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div className="cetner">
            <div className="col-sm-1 ">
              <SmileyIcon className="pull-left" />
            </div>
            <div className="col-sm-10 input-text">
              <textarea value={this.state.message} name="message" className="form-control input-message" rows="1" placeholder="Type a message" onChange={this.handleChange}></textarea>
            </div>
            <div className="col-sm-1 ">
              {this.state.empty ? <RecordIcon className="pull-right" /> : <SendIcon className="pull-right" onClick={this.sendMessage} />}
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default ConversationFooter;
