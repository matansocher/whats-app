import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SmileyIcon from 'material-ui/svg-icons/social/mood';
import RecordIcon from 'material-ui/svg-icons/av/mic';
import SendIcon from 'material-ui/svg-icons/content/send';

class InputMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      empty: true
    }
  }

  handleChange = (e) => {
    var change = {};
    const { value, name } = e.target;
    change[name] = value;
    if (!value || value.length === 0 || value === '') {
      this.setState({ change, empty: true });
    } else {
      this.setState({ change, empty: false });
    }
  }

  render() {
    return (
      <div>
        <SmileyIcon className="pull-left" />
        <textarea className="input-message" rows="1" placeholder="Type a message" onChange={this.handleChange} />
        {this.state.empty ? <RecordIcon className="pull-right" /> : <SendIcon className="pull-right" />}
      </div>
    );
  }
}

export default connect(null, actions)(InputMessage);
