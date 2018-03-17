import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import MoreIcon from 'material-ui/svg-icons/navigation/expand-more';
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

  deleteContactChat = () => {
    this.props.deleteContactChat(this.props.contact);
  }

  fetchChatData = () => {
    console.log(this.props.contact);
    const contactName = this.props.contact.info.name;
    console.log(contactName);
    this.props.fetchChatData(contactName);
  }

  render() {
    const { name, image } = this.props.contact.info;
    return (
      <div className="contact">
        <MuiThemeProvider>
          <div>
            <div className="pull-left" onClick={this.fetchChatData}>
              <img className="icon" alt="contact"
              src={require(`../images/${image}`)} />
              <h4>{name}</h4>
            </div>

            <div className="pull-right">
              <br />
              <IconMenu
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
              >
                <MenuItem primaryText="Archive Chat" />
                <MenuItem primaryText="Mute" />
                <MenuItem primaryText="Delete Chat" onClick={this.deleteContactChat} />
                <MenuItem primaryText="Pin Chat" />
                <MenuItem primaryText="Mark As Unread" />
              </IconMenu>
            </div>
          </div>
        </MuiThemeProvider>
        <br /><br /><br /><br /><br /><br /><br /><br />
      </div>
    );
  }
}

export default Contact;
