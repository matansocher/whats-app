import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class ListSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user
    }
  }

  render() {
    // console.log(this.props);
    const { name, image } = this.props.user;
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <h4>{name}</h4>
            <img className="icon pull-left" alt="personal"
              src={require(`../images/${image}`)} />

            <IconMenu
              className="pull-right"
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem primaryText="New Group" />
              <MenuItem primaryText="Profile" />
              <MenuItem primaryText="Archived" />
              <MenuItem primaryText="Stared" />
              <MenuItem primaryText="Settings" />
              <MenuItem primaryText="Log Out" />
            </IconMenu>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default connect(null, actions)(ListSettings);
