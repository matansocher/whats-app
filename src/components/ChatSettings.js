import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class ChatSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // currentChatUser: this.props.currentChatUser
    }
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <Paper zDepth={5} circle={true} className="pull-left" />
            <h4>{this.props.currentChatUser.name}</h4>

            <IconMenu
              className="pull-right"
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem primaryText="Contact Info" />
              <MenuItem primaryText="Select Messages" />
              <MenuItem primaryText="Mute" />
              <MenuItem primaryText="Clear Messages" />
              <MenuItem primaryText="Delete Chat" />
            </IconMenu>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default connect(null, actions)(ChatSettings);
