import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions/index';
import { getCircularProgress, sortContactsByLastMessageTime, filterBySearch, splitToPinned } from '../actions/CommonFunctions';
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
        this.fetchData(user.uid);
      } else {
        this.props.actionLogoutUser();
        this.props.history.push('/SignIn');
      }
    });
  }

  fetchData = (uid) => {
    this.setState({ loading: true }, () => {
      this.props.actionFetchAllDataForUser(uid, () => {
        this.setState({ loading: false });
      });
    });
  }

  deleteContactChat = (contact) => {
    this.setState({ loading: true }, () => {
      const useruid = this.props.user.uid;
      this.props.actionDeleteContactChat(useruid, contact.uid, () => {
        this.setState({ loading: false });
      });
    });
  }

  pinUnpinChat = (contactInfo, isPinned) => {
    this.setState({ loading: true }, () => {
      const useruid = this.props.user.uid;
      this.props.actionPinUnpinChat(useruid, contactInfo, isPinned, () => {
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
      const useruid = this.props.user.uid;
      this.props.actionFetchChatData(useruid, contact.uid, () => {
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
    contacts = sortContactsByLastMessageTime(contacts);
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
