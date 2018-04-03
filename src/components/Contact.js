import React, { Component } from 'react';
import { getLastMessageTime } from '../actions/CommonFunctions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import MoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
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
    const contactName = this.props.contact.info.name;
    this.props.fetchChatData(contactName)
  }

  render() {
    const { name, image } = this.props.contact.info;
    const { lastMessage } = this.props;
    const lastMessageTime = getLastMessageTime(lastMessage);
    return (
      <div className="contact">
        <MuiThemeProvider>
          <div>
            <ListItem
              onClick={this.fetchChatData}
              primaryText={name}
              secondaryText={lastMessage.content}
              style={{ color: '#ffffff' }}
              leftAvatar={<Avatar size={45} src={require(`../images/${image}`)} />}
            />

            <div className="last-message-hour-div">
              <span className="pull-right last-message-hour">{lastMessageTime}</span>
            </div>

            <IconMenu
              className="three-dots-contact"
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
            <Divider />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Contact;
