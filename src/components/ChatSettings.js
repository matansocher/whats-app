import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import '../css/ChatSettings.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class ChatSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const { name, image } = this.props.currentChatUser;
    return (
      <MuiThemeProvider>

        <div className="chat-settings">
          <div className="avatar">
            <img className="icon inline" alt="contact"
              src={require(`../images/${image}`)} />
          </div>
          <div className="name">
            <span>{name}</span>
            <span className="status">online</span>
          </div>
        </div>
        <div className="pull-right-chat-settings">
          <IconMenu
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
    );
  }
}

export default connect(null, actions)(ChatSettings);
