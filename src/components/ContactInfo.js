import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import _ from 'lodash';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import BackIcon from 'material-ui/svg-icons/navigation/chevron-left';

class ContactInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentWillMount() {
    if(_.isEmpty(this.props.currentChatUser)) {
      this.props.history.push('/');
    }
  }

  backClick = () => {
    this.props.history.push('/conversation');
  }

  render() {
    if(_.isEmpty(this.props.currentChatUser)) {
      return <span />;
    } else {
      const { avatar, name } = this.props.currentChatUser;
      return (
        <div>
          <MuiThemeProvider>
            <div>

              <div className="user-info-header">
                <div>
                  <FlatButton className="pull-left back-button-user-info" label="Back" primary={true}  onClick={this.backClick}>
                    <BackIcon className="pull-left back-user-info" />
                  </FlatButton>
                </div>

                <div className="center">
                  <h1>{`${name}'s`} Profile</h1>
                </div>

              </div>

              <br />

              <div className="center">
                <Avatar size={90} src={require(`../avatars/${avatar}`)} />
                <br />
                <h2>{name}</h2>
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
