import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className="message">
        <MuiThemeProvider>
        
          {this.props.sendOrRecieve}

          <span>אוהבת אותך</span>
          <span>15:20</span>

          <IconMenu
            className="pull-left"
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            <MenuItem primaryText="New Group" />
            <MenuItem primaryText="Profile" />
            <MenuItem primaryText="Archived" />
            <MenuItem primaryText="Stared" />
            <MenuItem primaryText="Settings" />
            <MenuItem primaryText="Log Out" />
          </IconMenu>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Message;
