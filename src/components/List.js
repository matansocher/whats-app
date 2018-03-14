import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions/index';
import ListSettings from './ListSettings';
import ListSearch from './ListSearch';
import Contact from './Contact';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }

  componentDidMount() {

  }

  renderList() {
    const chats = this.props.contactList;
    // console.log(chats);
    const chatsArray = _.values(chats);
    // console.log(chatsArray);
    return (
      chatsArray.map((chat) => {
        return <Contact chat={chat} />;
      })
    );
  }

  render() {
    return (
      <div>
        <div className="stick-top">
          <ListSettings user={this.props.user} />
          <ListSearch />
        </div>
        <MuiThemeProvider>
          <div className="scrollable-list">
            { this.state.loading ? <CircularProgress size={80} thickness={5} /> : <span />}

            {this.renderList()}
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     contactList: state.contactList,
//     user: state.user
//   };
// }

export default connect(null, actions)(List);
