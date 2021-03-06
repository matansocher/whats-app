import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import firebase from '../firebase';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class ChatsHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      searchTerm: ''
    }
  }

  logout = () => {
    firebase.auth().signOut().then(() => {
      this.props.actionLogoutUser();
      this.props.navigateToRoute('SignIn');
    }, error => {
      console.log(error);
    });
  }

  userInfoClicked = () => {
    this.props.navigateToRoute('UserInfo');
  }

  searchFriendsClicked = () => {
    this.props.navigateToRoute('SearchFriends');
  }

  settingsClicked = () => {
    this.props.navigateToRoute('Settings');
  }

  handleChange = (e) => {
    var change = {};
    const { value, name } = e.target;
    change[name] = value;
    this.setState(change);
    this.props.searchContact(value);
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="center">

          <IconMenu
            className="pull-right three-dots-chats-header"
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          >
            <MenuItem primaryText="User Info" onClick={this.userInfoClicked} />
            <MenuItem primaryText="Search Friends" onClick={this.searchFriendsClicked} />
            <MenuItem primaryText="Settings" onClick={this.settingsClicked} />
            <MenuItem primaryText="Log Out" onClick={this.logout} />
          </IconMenu>

          <h1>Chats</h1>
          <div className="search-chats">
            <input className="form-control text-input" placeholder="Search" name="searchTerm"
              value={this.state.searchTerm} onChange={this.handleChange} />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect(null, actions)(ChatsHeader);
