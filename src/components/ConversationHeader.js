import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';

class ConversationHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  backClick = () => {
    this.props.history.push('/chats');
  }

  render() {
    if (!this.props.currentChatUser.name) {
      return <span />;
    }
    const { name, image } = this.props.currentChatUser;
    return (
      <MuiThemeProvider>
        <div>

          <BackIcon className="pull-left icon back-icon"
             onClick={this.נackClick} />

          <ListItem
            primaryText={name}
            secondaryText="Online"
            leftAvatar={<Avatar size={45} src={require(`../images/${image}`)} />}
          />
          <IconMenu
            className="three-dots-conversation-header"
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            <MenuItem primaryText="Clear Messages" />
            <MenuItem primaryText="Delete Chat" />
          </IconMenu>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect(null, actions)(ConversationHeader);
