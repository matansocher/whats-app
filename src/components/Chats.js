import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions/index';
import { getCircularProgress, sortContactsByLastMessageTime, filterBySearch, splitToPinned, getDateHourString } from '../actions/CommonFunctions';
import fire from '../firebase';
import ChatsHeader from './ChatsHeader';
import Contact from './Contact';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';
import FlatButton from 'material-ui/FlatButton';
import { List } from 'material-ui/List';
import '../css/chats.css';

class Chats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      gesture: false,
      gestureText: "",
      loading: false
    }
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.onUnload)
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.fetchData(user.uid);
      } else {
        this.props.actionLogoutUser();
        this.props.history.push('/SignIn');
      }
    });
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onUnload)
  }

  onUnload = e => {
    console.log("onUnload");
    const { uid } = this.props.user;
    const lastSeen = getDateHourString();
    this.props.actionUpdateLastSeen(uid, lastSeen);
    // e.returnValue = "Hellooww";
  }

  fetchData = (uid) => {
    this.setState({ loading: true }, () => {
      const lastSeen = "Online";
      this.props.actionUpdateLastSeen(uid, lastSeen, () => {
        this.props.actionFetchUserData(uid, () => {
          this.props.actionFetchFriendsList(uid, () => {
            this.setState({ loading: false });
          });
        });
      });
    });
  }

  deleteContactChat = (contact) => {
    this.setState({ loading: true }, () => {
      const useruid = this.props.user.uid;
      this.props.actionDeleteContactChat(useruid, contact, () => {
        this.setState({ loading: false, gestureText: "Chat Was Deleted Successfully", gesture: true });
      });
    });
  }

  pinUnpinChat = (contact, isPinned) => {
    this.setState({ loading: true }, () => {
      const useruid = this.props.user.uid;
      this.props.actionPinUnpinChat(useruid, contact, isPinned, () => {
        const pinnedText = isPinned ? "Pinned" : "Unpinned";
        this.setState({ loading: false, gestureText: `Friend Was ${pinnedText} Successfully`, gesture: true });
      });
    });
  }

  navigateToRoute = (route) => {
    this.props.history.push(route);
  }

  searchContact = (searchTerm) => {
    this.setState({ searchTerm });
  }

  fetchChatData = (contactUid) => {
    this.setState({ loading: true }, () => {
      const useruid = this.props.user.uid;
      this.props.actionFetchChatData(useruid, contactUid, () => {
        this.setState({ loading: false })
        this.props.history.push('/conversation');
      });
    })
  }

  handleRequestClose = () => {
    this.setState({ gesture: false });
  };

  renderList() {
    console.log(this.props.contactList)
    if (_.isEmpty(this.props.contactList)) {
      console.log('asdcasdcasdcads')
    }
    if (_.isEmpty(this.props.contactList) && !this.state.loading) {
      if (!this.state.loading) {
        return (
          <div className="center">
            <h3>You have no conversations yet</h3>
            <FlatButton label="Find Friends" primary={true}
              onClick={() => this.navigateToRoute('SearchFriends')} />
          </div>
        );
      } else {
        return (<span />);
      }
    }
    let contacts = _.values(this.props.contactList);
    if (this.state.searchTerm !== '' && contacts && !_.isEmpty(contacts))
      contacts = filterBySearch(contacts, this.state.searchTerm);
    contacts = sortContactsByLastMessageTime(contacts);
    contacts = splitToPinned(contacts);
    return (
      contacts.map(contact => {
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

          <Snackbar open={this.state.gesture} message={this.state.gestureText}
            autoHideDuration={4000} onRequestClose={this.handleRequestClose} />

          <div className="chats-header">
            <ChatsHeader searchContact={this.searchContact}
              navigateToRoute={this.navigateToRoute} />
          </div>

          <div className="scrollable-chats">
            {this.state.loading ? getCircularProgress() : <span />}
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
