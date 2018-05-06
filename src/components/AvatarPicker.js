import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import _ from 'lodash';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';

class AvatarPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // avatar: this.props.avatar
    }
  }

  handleChange = (e) => {
    console.log(e.target.value);
    // this.setState({ avatar: e.target.value });
    this.props.changeAvatar(e.target.value);
  }

  renderAvatars() {
    if(_.isEmpty(this.props.avatars)) {
      return <span />;
    }
    return (
      this.props.avatars.map(avatar => {
        return(
          <MenuItem key={avatar}
            onClick={this.handleChange}
            leftIcon={ <Avatar size={45} src={avatar} 
              style={{ borderColor: '#000000', borderStyle: 'solid', borderWidth: 2 }}/> } />
        );
      })
    );
  }

  render() {
    return(
      <div className="center">
        <Paper>
          <Menu value={this.props.avatar}>
            {this.renderAvatars()}
          </Menu>
        </Paper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    avatars: state.avatars
  };
}

export default connect(mapStateToProps, actions)(AvatarPicker);