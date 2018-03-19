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
    const contactName = this.props.contact.info.name;
    this.props.fetchChatData(contactName);
  }

  render() {
    const { name, image } = this.props.contact.info;
    return (
      <div className="contact">
        <MuiThemeProvider>
          <div>
            <div onClick={this.fetchChatData}>
              <img className="icon inline" alt="contact"
                src={require(`../images/${image}`)} />
              <h2 className=" inline">{name}</h2>
            </div>

            <div className="three-dots-father">
              <br />
              <IconMenu
                className="three-dots"
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
