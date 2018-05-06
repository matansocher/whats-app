import React, { Component } from 'react';
import { getLastMessageTime, getLastMessageContent } from '../actions/CommonFunctions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreButton from 'material-ui/svg-icons/navigation/chevron-right';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import PinIcon from 'material-ui/svg-icons/toggle/star-border';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  fetchChatData = () => {
    const contactUid = this.props.contact.info.uid;
    this.props.fetchChatData(contactUid);
  }
  
  deleteContactChat = () => {
    this.props.deleteContactChat(this.props.contact);
  }
  
  pinUnpinChat = () => {
    const contact = this.props.contact;
    const isPinned = contact.pinned ? true : false;
    this.props.pinUnpinChat(contact, !isPinned); // reverse the pin bool
  }

  render() {
    const { name, avatar } = this.props.contact.info;
    const { pinned } = this.props.contact;
    const { lastMessage } = this.props;
    const lastMessageTime = lastMessage ? getLastMessageTime(lastMessage) : " ";
    const lmContent = lastMessage ? getLastMessageContent(lastMessage.content) : " ";
    return (
      <div className="contact">
        <MuiThemeProvider>
          <div>
            <ListItem
              onClick={this.fetchChatData} style={{ color: '#ffffff' }}
              primaryText={name} secondaryText={lmContent}
              leftAvatar={
                <Avatar size={45} src={require(`../avatars/${avatar}`)}
                  style={{ borderColor: '#000000', borderStyle: 'solid', borderWidth: 2 }} />
              }
            />

            <div className="last-message-hour-div">
              <span className="pull-right last-message-hour">{lastMessageTime}</span>
              <MoreButton className="pull-right contact-more-icon" />
              {pinned ? <PinIcon className="pull-right pin-icon" /> : <span />}
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
              <MenuItem primaryText={ pinned ? "Unpin Chat" : "Pin Chat" }
                onClick={this.pinUnpinChat} />
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