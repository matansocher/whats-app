import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreIcon from 'material-ui/svg-icons/navigation/expand-more';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  deleteMessage = () => {
    console.log(this.props.message);
    this.props.deleteMessage(this.props.message);
  }

  render() {
    // {this.props.sendOrRecieve}
    return (
      <div className="message">
        <MuiThemeProvider>
          <div>
            <span>{this.props.message.content}</span>
            <br />
            <span>{this.props.message.hour}</span>

            <IconMenu
              className="pull-left"
              iconButtonElement={<IconButton><MoreIcon /></IconButton>}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem primaryText="Reply Message" />
              <MenuItem primaryText="Forward Message" />
              <MenuItem primaryText="Star Message" />
              <MenuItem primaryText="Delete Message" onClick ={this.deleteMessage} />
            </IconMenu>
          </div>
        </MuiThemeProvider>
        <br /><br />
      </div>
    );
  }
}

export default Message;
