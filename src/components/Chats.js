import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions/index';
import { getCircularProgress } from '../actions/CommonFunctions';
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
      loading: false
    }
  }

  comonentWillMount() {
    // fire.auth().onAuthStateChanged(user => {
    //   if (user) {
    //     this.props.history.push('/');
    //   } else {
    //     this.props.history.push('/SignInOrSignUp');
    //   }
    // });
  }

  componentDidMount() {
    if(_.isEmpty(this.props.contactList)) { // if logged in
      this.setState({ loading: true }, () => {
        // this.props.fetchAllDataForUser(fire.auth().currentUser.displayName, () => {
        this.props.fetchAllDataForUser("matan", () => {
          this.setState({ loading: false });
        });
      });
    }
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
    this.props.fetchChatData(username, contact, this.navigateToConversation);
  }

  navigateToConversation = () => {
    console.log(this.props);
    // this.props.history.push('/conversation');
  }

  renderList() {
    const contacts = _.values(this.props.contactList);
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
            <ChatsHeader />
          </div>
          <div className="scrollable-chats">
            { this.state.loading ? getCircularProgress() : <span />}
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
