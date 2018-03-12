import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions/index';
import Chat from './Chat';
import List from './List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
        this.props.fetchUserData("matan", () => {
          this.setState({ loading: false });
        });
      });
    }
  }

  render() {
    return (
      <Router>
        <div>
          <div className="container container-fluid">

            <div className="col-sm-4">
              <List contactList={this.props.contactList}
                user={this.props.user} />
            </div>

            <div className="col-sm-8">
              <Chat chatMessages={this.props.chatMessages}
                currentChatUser={this.props.currentChatUser}
                user={this.props.user} />
            </div>

          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    contactList: state.contactList,
    chatMessages: state.chatMessages,
    currentChatUser: state.currentChatUser,
    user: state.user
  }
}

export default connect(mapStateToProps, actions)(App);

// <Switch>
//   <Route path="/Settings" component={Settings}/>
//   <Route path="/" component={HoursList}/>
//   <Route path="*" component={NoMatch}/>
// </Switch>
