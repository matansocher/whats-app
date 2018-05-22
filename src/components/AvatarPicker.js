import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import * as actions from '../actions/index';
import _ from 'lodash';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
// import { AvatarProps } from 'material-ui';

class AvatarPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  handleChange = (event, index, value) => {
    this.props.changeAvatar(value);
  }

  renderAvatars() {
    if (_.isEmpty(this.props.avatars)) {
      return <span />;
    }
    return (
      this.props.avatars.map(avatar => {
        return (
          <MenuItem key={avatar} value={avatar} primaryText={avatar}
            leftIcon={
              <Avatar size={100} src={require(`../avatars/${avatar}`)} value={avatar}
                style={{ borderColor: '#000000', borderStyle: 'solid', borderWidth: 2 }} />
            }
          />
        );
      })
    );
  }

  render() {
    return (
      <div className="center">
        <MuiThemeProvider>
          <DropDownMenu value={this.props.avatar} onChange={this.handleChange}
            style={{ width: 300 }}>
            {this.renderAvatars()}
          </DropDownMenu>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default AvatarPicker;

// function mapStateToProps(state) {
//   return {
//     avatars: state.avatars
//   };
// }

// export default connect(mapStateToProps, actions)(AvatarPicker);