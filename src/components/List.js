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

  deleteContactChat = (contact) => {
    const username = this.props.user.name;
    this.props.deleteContactChat(username, contact)
  }

  searchContact = () => {
    // todo - filter the list by the searchTerm
  }

  fetchChatData = (contact) => {
    const username = this.props.user.name;
    this.props.fetchChatData(username, contact);
  }

  renderList() {
    const contacts = _.values(this.props.contactList);
    return (
      contacts.map((contact) => {
        return <Contact key={contact.info.name} contact={contact}
          fetchChatData={this.fetchChatData}
          deleteContactChat={this.deleteContactChat} />
      })
    );
  }

  render() {
    if(_.isEmpty(this.props.user)) {
      return(
        <MuiThemeProvider>
          <div className="cetner">
            <CircularProgress size={150} thickness={10} />
          </div>
        </MuiThemeProvider>
      );
    }
    return (
      <div className="list">
        <div className="stick-top-list">
          <ListSettings user={this.props.user} />
          <ListSearch />
        </div>
        <MuiThemeProvider>
          <div className="scrollable-list scrollbar">
            { this.state.loading ? <CircularProgress size={80} thickness={5} /> : <span />}
            {this.renderList()}
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    contactList: state.contactList,
    user: state.user
  };
}

export default connect(mapStateToProps, actions)(List);
