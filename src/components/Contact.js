import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import MoreIcon from 'material-ui/svg-icons/navigation/expand-more';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div className="pull-left">
            <Paper zDepth={5} circle={true} className="pull-left" />
            <h4>Tuti</h4>
            <br />
            <span>אוהבת אותך יתותח</span>
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
