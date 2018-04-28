import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions/index';
import { getCircularProgress, sortContactByLastMessageTime, filterBySearch, splitToPinned } from '../actions/CommonFunctions';
import fire from '../firebase';
import ChatsHeader from './ChatsHeader';
import Contact from './Contact';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
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
  componentDidMount() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.fetchData(user.displayName);
      } else {
        this.props.actionLogoutUser();
        this.props.history.push('/SignIn');
      }
    });
  }

  fetchData = (currentUser) => {
    this.setState({ loading: true }, () => {
      this.props.actinoFetchAllDataForUser(currentUser, () => {
        this.setState({ loading: false });
      });
    });
  }

  deleteContactChat = (contact) => {
    this.setState({ loading: true }, () => {
      const username = this.props.user.name;
      this.props.actionDeleteContactChat(username, contact, () => {
        this.setState({ loading: false });
      });
    });
  }

  pinUnpinChat = (contactInfo, isPinned) => {
    this.setState({ loading: true }, () => {
      const username = this.props.user.name;
      this.props.actionPinUnpinChat(username, contactInfo, isPinned, () => {
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

  fetchChatData = (contact) => {
    this.setState({ loading: true }, () => {
      const username = this.props.user.name;
      this.props.actionFetchChatData(username, contact, () => {
        this.setState({ loading: false })
        this.props.history.push('/conversation');
      });
    })
  }
  renderList() {
    if(_.isEmpty(this.props.contactList)) {
      return(
        <div className="center">
          <h3>You have no conversations yet</h3>
          <FlatButton label="Find Friends" primary={true}
            onClick={() => this.navigateToRoute('SearchFriends')} />
        </div>
      );
    }
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
          deleteContactChat={this.deleteContactChat}
          pinUnpinChat={this.pinUnpinChat} />
      })
    );
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <div className="chats-header">
            <ChatsHeader searchContact={this.searchContact}
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
