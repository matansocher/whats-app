import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
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
    return (
      <div>
        <MuiThemeProvider>
          <Paper zDepth={5} circle={true} className="icon pull-left" />

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
        </MuiThemeProvider>
      </div>
    );
  }
}

export default connect(null, actions)(ListSettings);
