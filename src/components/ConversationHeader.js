import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import _ from 'lodash';
import { getLastSeenString } from '../actions/CommonFunctions';
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

  deleteContactChat = () => {
    this.props.deleteContactChat(this.props.currentChatUser);
  }

  backClick = () => {
    this.props.navigateToRoute('/');
  }

  infoClicked = () => {
    this.props.navigateToRoute('ContactInfo');
  }

  render() {
    if (_.isEmpty(this.props.currentChatUser)) {
      return <span />;
    }
    const { name, avatar, lastSeen, isTyping } = this.props.currentChatUser.info;
    return (
      <MuiThemeProvider>
        <div>

          <BackIcon className="pull-left icon back-icon"
            onClick={this.backClick} />

          <ListItem
            className="contact-info"
            primaryText={name}
            secondaryText={getLastSeenString(isTyping, lastSeen)}
            secondaryText={getLastSeenString(lastSeen)}
            onClick={this.infoClicked}
            leftAvatar={
              <Avatar size={45} src={require(`../avatars/${avatar}`)}
                style={{ borderColor: '#000000', borderStyle: 'solid', borderWidth: 2 }} />
            }
          />
          <IconMenu
            className="three-dots-conversation-header"
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          >
            <MenuItem onClick={this.deleteContactChat} primaryText="Delete Chat" />
          </IconMenu>

        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentChatUser: state.currentChatUser
  };
}

export default connect(mapStateToProps, actions)(ConversationHeader);
