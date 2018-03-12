import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import ListSearch from './ListSearch';
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
    if(_.isEmpty(this.props.tasks)) {
      this.setState({ loading: true }, () => {
        this.props.fetchTasks(1, "tuta", () => { // 1 is for incompleted tasks
          this.props.fetchSettings("tuta", () => {
            this.setState({ loading: false });
          });
        });
      });
    }
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

function mapStateToProps(state) {
  return {
    chatMessages: state.chatMessages,
    currentChatUser: state.currentChatUser,
    user: state.user
  };
}

export default connect(mapStateToProps, actions)(Chat);
