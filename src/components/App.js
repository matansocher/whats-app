import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions/index';
import Chat from './Chat';
import List from './List';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }

  componentDidMount() {
    if(_.isEmpty(this.props.contactList)) {
      this.setState({ loading: true }, () => {
        this.props.fetchAllDataForUser("matan", () => {
          this.setState({ loading: false });
        });
      });
    }
  }

  render() {
    return (
      <div>
        <List />
        <Chat />
      </div>
    );
  }
}

export default connect(null, actions)(App);


// <div className="col-sm-4 col-md-4 left">
//   <List contactList={chats}
//     user={info}
//     all={this.props.all} />
// </div>

// <div className="col-sm-8 col-md-8 right">
//   <Chat chatMessages={chats.tuta.messages}
//     currentChatUser={chats.tuta.info}
//     all={this.props.all} />
// </div>
