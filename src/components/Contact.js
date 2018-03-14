import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import MoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import Paper from 'material-ui/Paper';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const { name } = this.props.chat.info;
    return (
      <div className="list-group-item">
        <MuiThemeProvider>
          <div className="pull-left">
            <Paper zDepth={5} circle={true} className="pull-left" />
            <h4>Tuti</h4>
            <h4>{name}</h4>
          </div>
          <div className="pull-right">
            <span>15:20</span>
            <br />
            <IconMenu
              className="pull-right"
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem primaryText="Archive Chat" />
              <MenuItem primaryText="Mute" />
              <MenuItem primaryText="Delete Chat" />
              <MenuItem primaryText="Pin Chat" />
              <MenuItem primaryText="Mark As Unread" />
            </IconMenu>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Contact;
