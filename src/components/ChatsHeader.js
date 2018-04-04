import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
// import fire from '../firebase';
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
    // fire.auth().logout();
    this.props.logoutUser();
    this.props.history.push('SignInOrSignUp');
  }

  userInfoClicked = () => {
    this.props.history.push('UserInfo');
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
        <div>

          <IconMenu
            className="three-dots-contact"
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            <MenuItem primaryText="User Info" />
          </IconMenu>

          <div className="center">
            <h1>Chats</h1>
            <div className="search-chats">
              <input className="form-control text-input" placeholder="Search" name="searchTerm"
              value={this.state.searchTerm} onChange={this.handleChange} />
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect(null, actions)(ChatsHeader);
