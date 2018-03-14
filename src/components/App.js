import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions/index';
import Chat from './Chat';
import List from './List';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }

  componentDidMount() {
    // if(_.isEmpty(this.props.contactList)) {
    //   this.setState({ loading: true }, () => {
    //     this.props.fetchChatsForUser("matan", () => {
    //       this.setState({ loading: false });
    //     });
    //   });
    // }
  }

  render() {
    const { info, chats } = this.props.all;
    // console.log(chats);
    return (
      <div>
        <div className="col-sm-4 col-md-4 left">
          <List contactList={chats}
            user={info}
            all={this.props.all} />
        </div>

        <div className="col-sm-8 col-md-8 right">
          <Chat chatMessages={chats.tuta.messages}
            currentChatUser={chats.tuta.info}
            all={this.props.all} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    contactList: state.contactList,
    chatMessages: state.chatMessages,
    currentChatUser: state.currentChatUser,
    user: state.user,
    all: state.all
  }
}

export default connect(mapStateToProps, actions)(App);
