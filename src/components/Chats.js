import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions/index';
import { getCircularProgress, sortContactByLastMessageTime, filterBySearch } from '../actions/CommonFunctions';
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

  // comonentWillMount() {
    // fire.auth().onAuthStateChanged(user => {
    //   if (user) {
    //     this.props.history.push('/');
    //   } else {
    //     this.props.history.push('/SignInOrSignUp');
    //   }
    // });
  // }

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

  searchContact = (searchTerm) => {
    this.setState({ searchTerm });
  }

  fetchChatData = (contact) => {
    this.setState({ loading: true }, () => {
      const username = this.props.user.name;
      this.props.actionFetchChatData(username, contact, () => {
        this.setState({ loading: false })
        // this.props.history.push('/conversation');
      });
    })
  }
  renderList() {
    let contacts = _.values(this.props.contactList);
    if(this.state.searchTerm !== '' && contacts && !_.isEmpty(contacts))
      contacts = filterBySearch(contacts, this.state.searchTerm);
    contacts = sortContactByLastMessageTime(contacts);
    return (
      contacts.map((contact) => {
        return <Contact key={contact.info.name} contact={contact}
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
            <ChatsHeader searchContact={this.searchContact} />
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
