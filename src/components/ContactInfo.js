import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { getCircularProgress } from '../actions/CommonFunctions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import BackIcon from 'material-ui/svg-icons/navigation/chevron-left';

class ContactInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.currentChatUser.info.name,
      picture: '',
      loading: true
    }
  }

  backClick = () => {
    this.props.history.push('/');
  }

  render() {
    if(this.state.loading) {
      return getCircularProgress();
    } else {
      const { image, name } = this.props.currentChatUser.info;
      return (
        <div>
          <MuiThemeProvider>
            <div>

              <div className="user-info-header">
                <div className="pull-left">
                  <BackIcon onClick={this.backClick} />
                  <FlatButton label="Primary" primary={true} />
                </div>

                <div className="center">
                  <h1>{`${name}'s`} Profile</h1>
                </div>
              </div>

              <br />

              <div className="center">
                <Avatar size={90} src={require(`../images/${image}`)} />

                {name}
              </div>
            </div>
          </MuiThemeProvider>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    currentChatUser: state.currentChatUser
  };
}

export default connect(mapStateToProps, actions)(ContactInfo);
