import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions/index';
import { getCircularProgress, sortContactByLastMessageTime, filterBySearch, splitToPinned } from '../actions/CommonFunctions';
import fire from '../firebase';
import ChatsHeader from './ChatsHeader';
import Contact from './Contact';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import MobileTearSheet from '../../../MobileTearSheet';
import { List } from 'material-ui/List';
import '../css/chats.css';

class Chats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      loading: false
    }
  }

  comonentWillMount() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.history.push('/');
      } else {
        this.props.actionLogoutUser();
        this.props.history.push('/SignInOrSignUp');
      }
    });
  }

  componentDidMount() {
    if(_.isEmpty(this.props.contactList)) { // if logged in
      this.setState({ loading: true }, () => {
        // this.props.actinoFetchAllDataForUser(fire.auth().currentUser.displayName, () => {
        this.props.actinoFetchAllDataForUser("matan", () => {
          this.setState({ loading: false });
        });
      });
    }
  }

  deleteContactChat = (contact) => {
    this.setState({ loading: true }, () => {
      const username = this.props.user.name;
      this.props.actionDeleteContactChat(username, contact, () => {
        this.setState({ loading: false });
      });
    });
  }

  navigateToRoute = (route) => {
    this.props.history.push(route);
  }

  searchContact = (searchTerm) => {
    this.setState({ searchTerm });
  }

  userInfoShow = () => {
    this.props.history.push('UserInfo');
  }

  fetchChatData = (contact) => {
    console.log(contact);
    console.log(this.props.user);
    this.setState({ loading: true }, () => {
      const username = this.props.user.name;
      this.props.actionFetchChatData(username, contact, () => {
        this.setState({ loading: false })
        this.props.history.push('/conversation');
      });
    })
  }
  renderList() {
    let contacts = _.values(this.props.contactList);
    if(this.state.searchTerm !== '' && contacts && !_.isEmpty(contacts))
      contacts = filterBySearch(contacts, this.state.searchTerm);
    contacts = sortContactByLastMessageTime(contacts);
    contacts = splitToPinned(contacts);
    return (
      contacts.map((contact) => {
        return <Contact key={contact.info.email} contact={contact}
          lastMessage={contact.lastMessage}
          fetchChatData={this.fetchChatData}
          deleteContactChat={this.deleteContactChat} />
      })
    );
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <div className="chats-header">
            <ChatsHeader searchContact={this.searchContact}
              userInfoShow={this.userInfoShow}
              navigateToRoute={this.navigateToRoute} />
          </div>
          <div className="scrollable-chats">
            { this.state.loading ? getCircularProgress() : <span /> }
            <List>
              {this.renderList()}
            </List>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    contactList: state.contactList,
    user: state.user
  };
}

export default connect(mapStateToProps, actions)(Chats);
