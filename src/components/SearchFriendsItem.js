import React, { Component } from 'react';
import '../css/searchFriends.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class SearchFriendsItem extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  addAsFriend = () => {
    const { uid, email, avatar, name } = this.props.friend;
    this.props.addAsFriend({
      uid, email, avatar, name, pinned: false
    });
  }

  render() {
    const { name, avatar } = this.props.friend;
    return (
      <div className="friend">
        <MuiThemeProvider>
          <div>
            <ListItem
              style={{ color: '#ffffff' }}
              primaryText={name}
              leftAvatar={
                <Avatar size={45} src={require(`../avatars/${avatar}`)}
                  style={{ borderColor: '#000000', borderStyle: 'solid', borderWidth: 2 }} />
              }
            />

            <IconMenu
              className="pull-right three-dots-add-friend"
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
              <MenuItem primaryText="Add As Friend" onClick={this.addAsFriend} />
            </IconMenu>
            <Divider />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default SearchFriendsItem;
