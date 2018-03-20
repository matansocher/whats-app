import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import fire from '../config';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class ListSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user
    }
  }

  logout = () => {
    fire.auth().logout();
    this.props.logoutUser();
    this.props.history.push('SignInOrSignUp');
  }

  render() {
    const { name, image } = this.props.user;
    return (
      <div>
        <MuiThemeProvider>
          <div className="three-dots-father">
            <img className="icon inline" alt="personal"
              src={require(`../images/contact1.png`)} />
            <h2 className="inline">{name}</h2>

            <IconMenu
               className="three-dots"
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem primaryText="New Group" />
              <MenuItem primaryText="Profile" />
              <MenuItem primaryText="Archived" />
              <MenuItem primaryText="Stared" />
              <MenuItem primaryText="Settings" />
              <MenuItem primaryText="Log Out" onClick={this.logout} />
            </IconMenu>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default connect(null, actions)(ListSettings);
